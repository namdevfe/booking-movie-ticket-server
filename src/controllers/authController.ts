import { NextFunction, Request, Response } from "express"
import authService from "~/services/authService"

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await authService.login(req.body)
    res.status(response.statusCode).json(response)
  } catch (error) {
    next(error)
  }
}

const authController = {
  login
}

export default authController