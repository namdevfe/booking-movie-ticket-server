import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import authService from '~/services/authService'
import { AuthRequest } from '~/types/common'

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await authService.register(req.body)
    res.status(response.statusCode).json(response)
  } catch (error) {
    next(error)
  }
}

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await authService.login(req.body)
    res.status(response.statusCode).json(response)
  } catch (error) {
    next(error)
  }
}

const verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await authService.verifyEmail(req.body)
    res.status(response.statusCode).json(response)
  } catch (error) {
    next(error)
  }
}

const resendOTP = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await authService.resendOTP(req.body)
    res.status(response.statusCode).json(response)
  } catch (error) {
    next(error)
  }
}

const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await authService.forgotPassword(req.body)
    res.status(response?.statusCode || StatusCodes.OK).json(response)
  } catch (error) {
    next(error)
  }
}

const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await authService.resetPassword(req.body)
    res.status(response?.statusCode || StatusCodes.OK).json(response)
  } catch (error) {
    next(error)
  }
}

const getProfile = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const userId = req.user?.userId
  try {
    const response = await authService.getProfile(userId as string)
    res.status(response.statusCode).json(response)
  } catch (error) {
    next(error)
  }
}

const logout = async (req: Request, res: Response, next: NextFunction) => {
  const { refreshToken } = req.body
  try {
    const response = await authService.logout({ refreshToken })
    res.status(response.statusCode).json(response)
  } catch (error) {
    next(error)
  }
}

const authController = {
  register,
  login,
  verifyEmail,
  resendOTP,
  forgotPassword,
  resetPassword,
  getProfile,
  logout
}

export default authController
