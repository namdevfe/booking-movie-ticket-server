import ejs from 'ejs'
import { OAuth2Client } from 'google-auth-library'
import { StatusCodes } from 'http-status-codes'
import nodemailer, { TransportOptions } from 'nodemailer'
import path from 'path'
import { ENV } from '~/config/environment'
import { ApiResponse } from '~/types/api'

interface SendMailProvider {
  templateURL: string
  email: string
  subject: string
  [key: string]: any
}


export const sendMail = async ({ templateURL, ...data }: SendMailProvider): Promise<ApiResponse> => {
  try {
    const templatePath = path.resolve(__dirname, templateURL)

    // Khởi tạo OAuth2Client với Client ID và Client Secret 
    const oAuth2ClientInstance = new OAuth2Client(
      ENV.GOOGLE_OAUTH2_CLIENT_ID,
      ENV.GOOGLE_OAUTH2_CLIENT_SECRET
    )
    // Set Refresh Token vào OAuth2Client Credentials
    oAuth2ClientInstance.setCredentials({
      refresh_token: ENV.GOOGLE_OAUTH2_REFRESH_TOKEN
    })

    /**
       * Lấy AccessToken từ RefreshToken (bởi vì Access Token cứ một khoảng thời gian ngắn sẽ bị hết hạn)
       * Vì vậy mỗi lần sử dụng Access Token, chúng ta sẽ generate ra một thằng mới là chắc chắn nhất.
       */
      const accessTokenObject = await oAuth2ClientInstance.getAccessToken()
      // Access Token sẽ nằm trong property 'token' trong Object mà chúng ta vừa get được ở trên
      const accessToken = accessTokenObject?.token

      // Tạo một biến Transport từ Nodemailer với đầy đủ cấu hình, dùng để gọi hành động gửi mail
      const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: ENV.ADMIN_EMAIL_ADDRESS,
          clientId: ENV.GOOGLE_OAUTH2_CLIENT_ID,
          clientSecret: ENV.GOOGLE_OAUTH2_CLIENT_SECRET,
          refresh_token: ENV.GOOGLE_OAUTH2_REFRESH_TOKEN,
          accessToken: accessToken
        }
      } as TransportOptions) 

      const html = await ejs.renderFile(templatePath, data)

      const mailOptions = {
        to: data.email,
        subject: data.subject,
        html
      }

      await transport.sendMail(mailOptions)

      return { statusCode: StatusCodes.OK, message: 'Email sent successfully.' }
  } catch (error) {
    throw error
  }
 }