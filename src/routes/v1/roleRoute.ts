import express from 'express'
import roleController from '~/controllers/roleController'
import validateBodyMiddleware from '~/middlewares/validateBodyMiddleware'
import { createRoleSchema, updateRoleSchema } from '~/schemaValidations/roleSchemaValidation'

const Router = express.Router()

Router.route('/').post(validateBodyMiddleware(createRoleSchema), roleController.createRole)
Router.route('/:id').put(validateBodyMiddleware(updateRoleSchema), roleController.updateRole)

export const roleRoutes = Router
