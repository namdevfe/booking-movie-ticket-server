import nodemailer, { TransportOptions } from 'nodemailer'
import { OAuth2Client } from 'google-auth-library'
import { ENV } from '~/config/environment'
import SMTPPool from 'nodemailer/lib/smtp-pool'
import { ApiResponse } from '~/types/api'
import { StatusCodes } from 'http-status-codes'

interface SendMailProvider {
  email: string
  subject: string
  content: string
}

export const sendMail = async ({ email, subject, content }: SendMailProvider): Promise<ApiResponse> => { 
  

  try {
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
      // mailOption là những thông tin gửi từ phía client lên thông qua API
      const mailOptions = {
        to: email, // Gửi đến ai?
        subject: subject, // Tiêu đề email
        html: `${content}` // Nội dung email
      }
      // Gọi hành động gửi email
      await transport.sendMail(mailOptions)

      return { statusCode: StatusCodes.OK, message: 'Email sent successfully.' }
  } catch (error) {
    throw error
  }
 }