import express from 'express'
import authController from '~/controllers/authController'
import userController from '~/controllers/userController'
import authValidation from '~/validations/authValidation'
import userValidation from '~/validations/userValidation'

const Router = express.Router()

Router.route('/register')
  .post(userValidation.createUser, userController.createUser)

Router.route('/login')
  .post(authValidation.login, authController.login)

Router.route('/profile')
  .get(authController.getProfile)

export const authRoutes = Router
