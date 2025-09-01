import Joi from 'joi'
import { ForgotPasswordPayload, LoginPayload, ResendOTPPayload, ResetPasswordPayload, VerifyEmailPayload } from '~/types/authType'

export const loginSchema = Joi.object<LoginPayload>({
  email: Joi.string().email({ minDomainSegments: 1, tlds: { allow: ['com'] } }).max(256).trim().strict()
    .messages({
      'string.base': 'Email must be a string',
      'string.empty': 'Email cannot be empty',
      'string.trim': 'Email must not have leading or trailing whitespace',
      'string.email': 'Email must be a valid email',
      'string.max': 'Email length must be less than or equal to 256 characters long'
  }),
  username: Joi.string().messages({
    'string.base': 'Username must be a string',
    'string.empty': 'Username cannot be empty',
  }),
  password: Joi.string().required().min(6).trim().strict().messages({
    'string.base': 'Password must be a string',
    'string.empty': 'Password cannot be empty',
    'any.required': 'Password is required',
    'string.min': 'Password must be at least 6 characters long'
  })
}).xor('email', 'username')

export const verifyEmailSchema = Joi.object<VerifyEmailPayload>({
  email: Joi.string().required().email({ minDomainSegments: 1, tlds: { allow: ['com'] } }).max(256).trim().strict()
    .messages({
      'string.base': 'Email must be a string',
      'string.empty': 'Email cannot be empty',
      'string.trim': 'Email must not have leading or trailing whitespace',
      'string.email': 'Email must be a valid email',
      'string.max': 'Email length must be less than or equal to 256 characters long',
      'any.required': 'Email is required'
  }),
  otpCode: Joi.string().required().length(6).messages({
    'string.base': 'OTP code must be a string',
    'string.empty': 'OTP Code cannot be empty',
    'string.length': 'OTP code must be exactly 6 characters',
    'any.required': 'OTP Code is required',
  })
})

export const resendOTPSchema = Joi.object<ResendOTPPayload>({
  email: Joi
    .string()
    .required()
    .email({ minDomainSegments: 1, tlds: { allow: ['com'] } })
    .max(256)
    .trim()
    .strict()
    .messages({
      'string.base': 'Email must be a string',
      'string.empty': 'Email cannot be empty',
      'string.trim': 'Email must not have leading or trailing whitespace',
      'string.email': 'Email must be a valid email',
      'string.max': 'Email length must be less than or equal to 256 characters long',
      'any.required': 'Email is required'
  })
})

export const forgotPasswordSchema = Joi.object<ForgotPasswordPayload>({
  email: Joi
    .string()
    .required()
    .email({ minDomainSegments: 1, tlds: { allow: ['com'] } })
    .max(256)
    .trim()
    .strict()
    .messages({
      'string.base': 'Email must be a string',
      'string.empty': 'Email cannot be empty',
      'string.trim': 'Email must not have leading or trailing whitespace',
      'string.email': 'Email must be a valid email',
      'string.max': 'Email length must be less than or equal to 256 characters long',
      'any.required': 'Email is required'
  })
})

export const resetPasswordSchema = Joi.object<ResetPasswordPayload>({
  email: Joi
    .string()
    .required()
    .email({ minDomainSegments: 1, tlds: { allow: ['com'] } })
    .max(256)
    .trim()
    .strict()
    .messages({
      'string.base': 'Email must be a string',
      'string.empty': 'Email cannot be empty',
      'string.trim': 'Email must not have leading or trailing whitespace',
      'string.email': 'Email must be a valid email',
      'string.max': 'Email length must be less than or equal to 256 characters long',
      'any.required': 'Email is required'
  }),
  password: Joi.string().required().min(6).trim().strict().messages({
    'string.base': 'Password must be a string',
    'string.empty': 'Password cannot be empty',
    'any.required': 'Password is required',
    'string.min': 'Password must be at least 6 characters long'
  }),
  resetPasswordToken: Joi.string().required().trim().strict().messages({
    'string.base': 'Reset password token must be a string',
    'string.empty': 'Reset password token cannot be empty',
    'string.trim': 'Reset password token must not have leading or trailing whitespace',
    'any.required': 'Reset password token is required',
  })
})