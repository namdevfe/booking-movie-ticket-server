import express from 'express'
import authController from '~/controllers/authController'
import validateBodyMiddleware from '~/middlewares/validateBodyMiddleware'
import {
  forgotPasswordSchema,
  loginSchema,
  logoutSchema,
  resendOTPSchema,
  resetPasswordSchema,
  verifyEmailSchema
} from '~/schemaValidations/authSchemaValidation'
import { createUserSchema } from '~/schemaValidations/userSchemaValidation'

const Router = express.Router()

Router.route('/register').post(validateBodyMiddleware(createUserSchema), authController.register)

Router.route('/login').post(validateBodyMiddleware(loginSchema), authController.login)

Router.route('/verify-email').put(
  validateBodyMiddleware(verifyEmailSchema),
  authController.verifyEmail
)

Router.route('/resend-otp').put(validateBodyMiddleware(resendOTPSchema), authController.resendOTP)

Router.route('/forgot-password').put(
  validateBodyMiddleware(forgotPasswordSchema),
  authController.forgotPassword
)

Router.route('/reset-password').put(
  validateBodyMiddleware(resetPasswordSchema),
  authController.resetPassword
)

Router.route('/profile').get(authController.getProfile)

Router.route('/logout').put(validateBodyMiddleware(logoutSchema), authController.logout)

export const authRoutes = Router
