import Joi from 'joi'
import { MESSAGE } from '~/constants/message'
import { REGEX } from '~/constants/validator'
import { CreateUserPayload, UpdateUserPayload } from '~/types/userType'

export const createUserSchema = Joi.object<CreateUserPayload>({
    dateOfBirth: Joi.string().isoDate().trim().strict().messages({
      'string.base': 'Date of birth must be a string',
      'string.trim': 'Date of birth must not have leading or trailing whitespace',
      'string.isoDate': 'Date of birth must be is isoDate format'
    }),
    email: Joi.string()
      .required()
      .email({ minDomainSegments: 1, tlds: { allow: ['com'] } }).max(256).trim().strict()
      .messages({
        'string.base': 'Email must be a string',
        'any.required': 'Email is required',
        'string.empty': 'Email cannot be empty',
        'string.trim': 'Email must not have leading or trailing whitespace',
        'string.email': 'Email must be a valid email',
        'string.max': 'Email length must be less than or equal to 256 characters long'
      }),
    fullName: Joi.string().required().max(256).trim().strict().messages({
      'string.base': 'Full name must be a string',
      'any.required': 'Full name is required',
      'string.empty': 'Full name cannot be empty',
      'string.trim': 'Full name must not have leading or trailing whitespace',
      'string.max': 'Full name length must be less than or equal to 256 characters long'
    }),
    password: Joi.string().required().min(6).trim().strict().messages({
      'string.base': 'Password must be a string',
      'string.empty': 'Password cannot be empty',
      'any.required': 'Password is required',
      'string.min': 'Password must be at least 6 characters long'
    }),
    phoneNumber: Joi.string()
      .required()
      .pattern(new RegExp(REGEX.VIETNAMESE_PHONE_NUMBER))
      .messages({
        'string.base': 'phoneNumber must be a text value',
        'string.empty': 'phoneNumber cannot be empty',
        'any.required': 'phoneNumber is required',
        'string.pattern.base': MESSAGE.INVALID_VIETNAMESE_PHONE_NUMBER
      }),
    username: Joi.string()
      .required()
      .messages({
        'string.base': 'Username must be a string',
        'string.empty': 'Username cannot be empty',
        'any.required': 'Username is required'
      })
})

export const updateUserSchema = Joi.object<UpdateUserPayload & { userId: string }>({
    userId: Joi.string().required().pattern(REGEX.OBJECT_ID_RULE).trim().strict().messages({
      'string.base': 'User id must be a string',
      'string.empty': 'User id cannot be empty',
      'any.required': 'User id is required',
      'string.pattern.base': MESSAGE.OBJECT_ID_RULE_MESSAGE
    }),
    dateOfBirth: Joi.string().isoDate().trim().strict().messages({
      'string.base': 'Date of birth must be a string',
      'string.trim': 'Date of birth must not have leading or trailing whitespace',
      'string.isoDate': 'Date of birth must be is isoDate format'
    }),
    email: Joi.string()
      .required()
      .email({ minDomainSegments: 1, tlds: { allow: ['com'] } }).max(256).trim().strict()
      .messages({
        'string.base': 'Email must be a string',
        'any.required': 'Email is required',
        'string.empty': 'Email cannot be empty',
        'string.trim': 'Email must not have leading or trailing whitespace',
        'string.email': 'Email must be a valid email',
        'string.max': 'Email length must be less than or equal to 256 characters long'
      }),
    fullName: Joi.string().required().max(256).trim().strict().messages({
      'string.base': 'Full name must be a string',
      'any.required': 'Full name is required',
      'string.empty': 'Full name cannot be empty',
      'string.trim': 'Full name must not have leading or trailing whitespace',
      'string.max': 'Full name length must be less than or equal to 256 characters long'
    }),
    password: Joi.string().required().min(6).trim().strict().messages({
      'string.base': 'Password must be a string',
      'string.empty': 'Password cannot be empty',
      'any.required': 'Password is required',
      'string.min': 'Password must be at least 6 characters long'
    }),
    phoneNumber: Joi.string()
      .required()
      .pattern(new RegExp(REGEX.VIETNAMESE_PHONE_NUMBER))
      .messages({
        'string.base': 'phoneNumber must be a text value',
        'string.empty': 'phoneNumber cannot be empty',
        'any.required': 'phoneNumber is required',
        'string.pattern.base': MESSAGE.INVALID_VIETNAMESE_PHONE_NUMBER
      }),
    username: Joi.string()
      .required()
      .messages({
        'string.base': 'Username must be a string',
        'string.empty': 'Username cannot be empty',
      'any.required': 'Username is required'
  }),
  isActive: Joi.boolean().optional()
})