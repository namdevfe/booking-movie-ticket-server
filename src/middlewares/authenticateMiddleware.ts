import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { PUBLIC_PATHS } from '~/constants/path'
import ApiError from '~/utils/ApiError'
import jwt, { TokenExpiredError } from 'jsonwebtoken'
import { ENV } from '~/config/environment'
import { AuthRequest } from '~/types/common'

const authenticateMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const currentPath = req.path

    // Check public apis
    if (PUBLIC_PATHS.includes(currentPath)) {
      return next()
    }

    // Get access token from headers
    const accessToken = req.headers.authorization?.split(' ')?.[1]

    if (!accessToken) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, 'Token is required')
    }

    // Verify token
    const decode = jwt.verify(accessToken, ENV.JWT_ACCESS_TOKEN_SECRET)
    req.user = <{ userId: string }>decode
    next()
  } catch (error) {
     if (error instanceof TokenExpiredError) {
      next(new ApiError(StatusCodes.UNAUTHORIZED, 'Token is expired.'))
    } else {
      next(new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid token.'))
    }
    next(error)
  }
}

export default authenticateMiddleware