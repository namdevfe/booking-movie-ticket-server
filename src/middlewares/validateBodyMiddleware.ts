import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'

const validateBodyMiddleware =
  (schema: Joi.ObjectSchema) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body, { abortEarly: false })
      next()
    } catch (error) {
      next(error)
    }
  }

export default validateBodyMiddleware
