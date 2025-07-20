import { NextFunction, Request, Response } from "express"
import { loginSchema, verifyEmailSchema } from "~/schemaValidations/authSchemaValidation"

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

const authValidation = {
  login,
  verifyEmail
}

export default authValidation