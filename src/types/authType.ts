import { User } from '~/types/userType'

export type LoginPayload = Pick<User, 'email' | 'username' | 'password'>
export type LoginResponse = { accessToken: string, refreshToken: string }

export type VerifyEmailPayload = Pick<User, 'email' | 'otpCode'>