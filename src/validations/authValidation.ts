import { NextFunction, Request, Response } from "express"
import { loginSchema } from "~/schemaValidations/authSchemaValidation"

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await loginSchema.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    next(error)
  }
}

const authValidation = {
  login
}

export default authValidation