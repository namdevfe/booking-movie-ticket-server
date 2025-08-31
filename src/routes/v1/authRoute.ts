import express from 'express'
import authController from '~/controllers/authController'
import userController from '~/controllers/userController'
import authValidation from '~/validations/authValidation'
import userValidation from '~/validations/userValidation'

const Router = express.Router()

Router.route('/register')
  .post(userValidation.createUser, authController.register)

Router.route('/login')
  .post(authValidation.login, authController.login)

Router.route('/verify-email')
  .put(authValidation.verifyEmail, authController.verifyEmail)

Router.route('/resend-otp')
  .put(authValidation.resendOTP, authController.resendOTP)

Router.route('/forgot-password')
  .put(authValidation.forgotPassword, authController.forgotPassword)

Router.route('/profile')
  .get(authController.getProfile)


export const authRoutes = Router
