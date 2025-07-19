import { NextFunction, Request, Response } from "express"
import authService from "~/services/authService"
import { AuthRequest } from "~/types/common"

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await authService.login(req.body)
    res.status(response.statusCode).json(response)
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

const authController = {
  login,
  getProfile
}

export default authController