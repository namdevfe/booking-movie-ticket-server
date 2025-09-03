import express from 'express'
import { PERMISSIONS } from '~/constants/permission'
import roleController from '~/controllers/roleController'
import authorizeMiddleware from '~/middlewares/authorizeMiddleware'
import validateBodyMiddleware from '~/middlewares/validateBodyMiddleware'
import { createRoleSchema, updateRoleSchema } from '~/schemaValidations/roleSchemaValidation'

const Router = express.Router()

Router.route('/')
  .post(
    authorizeMiddleware([PERMISSIONS.ROLE.CREATE]),
    validateBodyMiddleware(createRoleSchema),
    roleController.createRole
  )
  .get(authorizeMiddleware([PERMISSIONS.ROLE.LIST]), roleController.getRoles)

Router.route('/:id')
  .get(roleController.getRoleDetails)
  .put(validateBodyMiddleware(updateRoleSchema), roleController.updateRole)
  .delete(roleController.deleteRole)

export const roleRoutes = Router
