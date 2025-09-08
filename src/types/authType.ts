import { User } from '~/types/userType'

export type LoginPayload = Pick<User, 'email' | 'username' | 'password'>
export type LoginResponse = { accessToken: string; refreshToken: string }
export type VerifyEmailPayload = Pick<User, 'email' | 'otpCode'>
export type ResendOTPPayload = Pick<User, 'email'>
export type ForgotPasswordPayload = Pick<User, 'email'>
export type ResetPasswordPayload = Pick<User, 'email' | 'password' | 'resetPasswordToken'>
export type LogoutPayload = Pick<User, 'refreshToken'>
