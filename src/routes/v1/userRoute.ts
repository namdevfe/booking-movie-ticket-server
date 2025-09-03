import express from 'express'
import userController from '~/controllers/userController'
import validateBodyMiddleware from '~/middlewares/validateBodyMiddleware'
import { createUserSchema, updateUserSchema } from '~/schemaValidations/userSchemaValidation'

const Router = express.Router()

Router.route('/').post(validateBodyMiddleware(createUserSchema), userController.createUser)

Router.route('/:userId').put(validateBodyMiddleware(updateUserSchema), userController.updateUserById)

export const userRoutes = Router
