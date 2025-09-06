import bcrypt from 'bcrypt'
import { StatusCodes } from 'http-status-codes'
import User from '~/models/userModel'
import { ApiResponse } from '~/types/api'
import {
  ForgotPasswordPayload,
  LoginPayload,
  LoginResponse,
  ResendOTPPayload,
  ResetPasswordPayload,
  VerifyEmailPayload
} from '~/types/authType'
import { CreateUserPayload, GetProfileResponse } from '~/types/userType'
import ApiError from '~/utils/ApiError'
import { generateAccessToken, generateRefreshToken } from '~/utils/jwt'
import { User as UserType } from '~/types/userType'
import { sendMail } from '~/providers/sendMailProvider'
import { generateOTP } from '~/utils/generateOTP'
import { ENV } from '~/config/environment'
import Role from '~/models/roleModel'
import mongoose from 'mongoose'

const register = async (payload: CreateUserPayload): Promise<ApiResponse<UserType>> => {
  const { email, username, phoneNumber } = payload

  try {
    // Check email
    const existingUser = await User.findOne({
      $or: [{ email }, { username }, { phoneNumber }]
    })

    if (existingUser) {
      throw new ApiError(StatusCodes.CONFLICT, 'Email, username or phoneNumber has already exists')
    }

    // Get default roles
    const defaultRoles = await Role.find({ isDefault: true })
    const defaultRoleIds: mongoose.Types.ObjectId[] = defaultRoles.map((role) => role._id)

    const createdUser = new User({
      ...payload,
      roles: defaultRoleIds || []
    })
    await createdUser.save()

    // Generate OTP Code & save to database
    const otpCode = generateOTP(6)
    createdUser.otpCode = otpCode

    // OTP code will expire in 5 minutes
    const otpExpiresIn = Date.now() + 5 * 60 * 1000
    createdUser.otpExpiresIn = otpExpiresIn
    await createdUser.save()

    // Send email
    await sendMail({
      email: createdUser.email,
      subject: 'Welcome to Booking Movie Ticket System! Activate Your Account',
      otpCode: createdUser.otpCode,
      fullName: createdUser.fullName,
      templateURL: '../views/email/activation-email.ejs'
    })

    const {
      password: excludePassword,
      otpCode: excludeOTPCode,
      otpExpiresIn: excludeOTPExpiresIn,
      ...userResponse
    } = createdUser.toObject()

    return (
      createdUser._id && {
        statusCode: StatusCodes.CREATED,
        message:
          'Register account is successfully. OTP Code sent to your email address, please check your email',
        data: userResponse
      }
    )
  } catch (error) {
    throw error
  }
}

const login = async (payload: LoginPayload): Promise<ApiResponse<LoginResponse>> => {
  try {
    const { email, username, password } = payload

    // Check email, username
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    })

    if (!existingUser) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Email or username incorrect')
    }

    // Check password
    const isCorrectPassword = await bcrypt.compare(
      password as string,
      existingUser.password as string
    )
    if (!isCorrectPassword) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, 'Password incorrect')
    }

    // Check account is actived
    const isActive = existingUser.isActive
    if (!isActive) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        'Account not activated. Please check your email for the OTP code.'
      )
    }

    // Create access token and refresh token
    const accessToken = generateAccessToken({ userId: existingUser._id.toString() })
    const refreshToken = generateRefreshToken({ userId: existingUser._id.toString() })

    // Save refresh token to database
    existingUser.refreshToken = refreshToken
    await existingUser.save()

    // Return response for client
    return {
      statusCode: StatusCodes.OK,
      message: 'Login is successfully',
      data: { accessToken, refreshToken }
    }
  } catch (error) {
    throw error
  }
}

const verifyEmail = async (payload: VerifyEmailPayload): Promise<ApiResponse> => {
  const { email, otpCode } = payload
  try {
    // Check email
    const existingUser = await User.findOne({ email })
    if (!existingUser) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Email does not exists')
    }

    const isActive = existingUser.isActive
    if (isActive) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Account already verified')
    }

    // Check OTP Code
    const isOTPCodeCorrect = otpCode === existingUser.otpCode
    if (!isOTPCodeCorrect) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid OTP code')
    }

    // Check OTP code time expires (now < time expires)
    const now = Date.now()
    if (now > Number(existingUser.otpExpiresIn)) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'OTP code is expired')
    }

    existingUser.isActive = true
    existingUser.otpCode = null
    existingUser.otpExpiresIn = null
    await existingUser.save()

    // Send email
    await sendMail({
      email: existingUser.email,
      subject: 'Account Activated Successfully',
      fullName: existingUser.fullName,
      templateURL: '../views/email/activation-email-success.ejs'
    })

    return { statusCode: StatusCodes.OK, message: 'Your email address is actived' }
  } catch (error) {
    throw error
  }
}

const resendOTP = async (payload: ResendOTPPayload): Promise<ApiResponse> => {
  const { email } = payload

  try {
    const existingUser = await User.findOne({ email })
    if (!existingUser) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Email does not exists')
    }

    const isActive = existingUser.isActive
    if (isActive) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Account already verified')
    }

    // Generate OTP Code
    const otpCode = generateOTP(6)
    const otpExpiresIn = Date.now() + 5 * 60 * 1000
    existingUser.otpCode = otpCode
    existingUser.otpExpiresIn = otpExpiresIn
    await existingUser.save()

    // Send email
    await sendMail({
      email: existingUser.email,
      subject: 'Welcome to Booking Movie Ticket System! Activate Your Account',
      otpCode: existingUser.otpCode,
      fullName: existingUser.fullName,
      templateURL: '../views/email/activation-email.ejs'
    })

    return {
      statusCode: StatusCodes.CREATED,
      message: 'Resend OTP Code your email address is successfully'
    }
  } catch (error) {
    throw error
  }
}

const forgotPassword = async (payload: ForgotPasswordPayload): Promise<ApiResponse | undefined> => {
  const { email } = payload
  try {
    const existingUser = await User.findOne({ email })
    if (!existingUser) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Email does not exists')
    }

    // Generate resetPassword token
    existingUser.createResetPasswordToken()
    await existingUser.save()

    // Generate reset link
    const resetLink = `${ENV.CLIENT_URL}/auth?email=${encodeURIComponent(
      existingUser.email
    )}&resetPasswordToken=${encodeURIComponent(existingUser.resetPasswordToken as string)}`

    // Send mail
    await sendMail({
      email: existingUser.email,
      subject: 'Password Reset Request – Booking Movie Ticket System',
      resetToken: existingUser.resetPasswordToken,
      resetLink: resetLink,
      fullName: existingUser.fullName,
      templateURL: '../views/email/reset-password.ejs'
    })

    return {
      statusCode: StatusCodes.OK,
      message: 'Reset password link is sent to your email'
    }
  } catch (error) {
    throw error
  }
}

const resetPassword = async (payload: ResetPasswordPayload): Promise<ApiResponse | undefined> => {
  const { email, resetPasswordToken } = payload
  try {
    const existingUser = await User.findOne({ email, resetPasswordToken })
    if (!existingUser) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid reset password token')
    }

    if (Date.now() > Number(existingUser.resetPasswordExpiresIn)) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Reset password token is expired')
    }

    existingUser.password = payload.password
    existingUser.resetPasswordToken = null
    existingUser.resetPasswordExpiresIn = null
    await existingUser.save()

    return {
      statusCode: StatusCodes.OK,
      message: 'Reset password is successfully'
    }
  } catch (error) {
    throw error
  }
}

const getProfile = async (userId: string): Promise<ApiResponse<GetProfileResponse>> => {
  try {
    const excludedFields =
      '-password -refreshToken -resetPasswordToken -resetPasswordExpiresIn -otpCode -otpExpiresIn'
    const profile = await User.findById(userId).select(excludedFields).populate('roles')

    if (!profile) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Profile not found')
    }

    const {
      password: excludePassword,
      otpCode: excludeOTPCode,
      otpExpiresIn: excludeOTPExpiresIn,
      ...userResponse
    } = profile.toObject()

    return {
      statusCode: StatusCodes.OK,
      message: 'Get profile is successfully',
      data: userResponse
    }
  } catch (error) {
    throw error
  }
}

const authService = {
  register,
  login,
  verifyEmail,
  resendOTP,
  forgotPassword,
  resetPassword,
  getProfile
}

export default authService
