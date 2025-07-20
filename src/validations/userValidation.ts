import { NextFunction, Request, Response } from 'express'
import { createUserSchema, updateUserSchema } from '~/schemaValidations/userSchemaValidation'

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await createUserSchema.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    next(error)
  }
}

const updateUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.userId
    await updateUserSchema.validateAsync({ ...req.body, userId }, { abortEarly: false })
    next()
  } catch (error) {
    next(error)
  }
}

const userValidation = {
  createUser,
  updateUserById
}

export default userValidation