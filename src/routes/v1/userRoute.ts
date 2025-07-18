import express from 'express'
import userController from '~/controllers/userController'
import userValidation from '~/validations/userValidation'

const Router = express.Router()

Router.route('/')
  .post(userValidation.createUser, userController.createUser)

Router.route('/:userId')
  .put(userValidation.updateUserById, userController.updateUserById)
  

export const userRoutes = Router
