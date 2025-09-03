import Joi from 'joi'
import { CreateRolePayload } from '~/types/roleType'

export const createRoleSchema = Joi.object<CreateRolePayload>({
  name: Joi.string().required().trim().strict().messages({
    'string.base': 'Name must be a string',
    'string.empty': 'Name cannot be empty',
    'any.required': 'Name is required',
    'string.trim': 'Name must not have leading or trailing whitespace'
  }),
  description: Joi.string().optional().allow('', null).trim().strict().messages({
    'string.base': 'Description must be a string',
    'string.empty': 'Description cannot be an empty string',
    'any.required': 'Description is required',
    'string.trim': 'Description must not have leading or trailing whitespace',
    'any.only': 'Description can only be null or a string'
  }),
  isDefault: Joi.boolean().optional().default(false).messages({
    'boolean.base': `"isDefault" must be true or false`
  })
})
