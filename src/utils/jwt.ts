import jwt from 'jsonwebtoken'
import { ENV } from '~/config/environment'

interface JWTPayload {
  userId: string
}

export const generateAccessToken = (payload: JWTPayload) => {
  return jwt.sign(payload, ENV.JWT_ACCESS_TOKEN_SECRET, { expiresIn: ENV.JWT_ACCESS_TOKEN_EXPIRES_IN })
}

export const generateRefreshToken = (payload: JWTPayload) => {
  return jwt.sign(payload, ENV.JWT_REFRESH_TOKEN_SECRET, { expiresIn: ENV.JWT_REFRESH_TOKEN_EXPIRES_IN })
}