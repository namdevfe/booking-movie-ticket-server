import express from 'express'
import roleController from '~/controllers/roleController'
import validateBodyMiddleware from '~/middlewares/validateBodyMiddleware'
import { createRoleSchema, updateRoleSchema } from '~/schemaValidations/roleSchemaValidation'

const Router = express.Router()

Router.route('/').post(validateBodyMiddleware(createRoleSchema), roleController.createRole)
Router.route('/:id')
  .get(roleController.getRoleDetails)
  .put(validateBodyMiddleware(updateRoleSchema), roleController.updateRole)
  .delete(roleController.deleteRole)

export const roleRoutes = Router
