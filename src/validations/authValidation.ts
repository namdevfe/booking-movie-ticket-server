import { NextFunction, Request, Response } from "express"
import { forgotPasswordSchema, loginSchema, resendOTPSchema, resetPasswordSchema, verifyEmailSchema } from "~/schemaValidations/authSchemaValidation"

const login = async (req: Request, _: Response, next: NextFunction) => {
  try {
    await loginSchema.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    next(error)
  }
}

const verifyEmail = async (req: Request, _: Response, next: NextFunction) => {
  try {
    await verifyEmailSchema.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    next(error)
  }
}

const resendOTP = async (req: Request, _: Response, next: NextFunction) => {
  try {
    await resendOTPSchema.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    next(error)
  }
}

const forgotPassword = async (req: Request, _: Response, next: NextFunction) => {
  try {
    await forgotPasswordSchema.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    next(error)
  }
}

const resetPassword = async (req: Request, _: Response, next: NextFunction) => {
  try {
    await resetPasswordSchema.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    next(error)
  }
}

const authValidation = {
  login,
  verifyEmail,
  resendOTP,
  forgotPassword,
  resetPassword
}

export default authValidation