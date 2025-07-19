import Joi from "joi";
import { LoginPayload } from "~/types/authType";

export const loginSchema = Joi.object<LoginPayload>({
  email: Joi.string().optional().email({ minDomainSegments: 1, tlds: { allow: ['com'] } }).max(256).trim().strict()
    .messages({
      'string.base': 'Email must be a string',
      // 'any.required': 'Email is required',
      'string.empty': 'Email cannot be empty',
      'string.trim': 'Email must not have leading or trailing whitespace',
      'string.email': 'Email must be a valid email',
      'string.max': 'Email length must be less than or equal to 256 characters long'
  }),
  username: Joi.string().required().messages({
    'string.base': 'Username must be a string',
    'string.empty': 'Username cannot be empty',
    // 'any.required': 'Username is required'
  }),
  password: Joi.string().required().min(6).trim().strict().messages({
    'string.base': 'Password must be a string',
    'string.empty': 'Password cannot be empty',
    'any.required': 'Password is required',
    'string.min': 'Password must be at least 6 characters long'
  })
})