import express from 'express'
import roleController from '~/controllers/roleController'
import validateBodyMiddleware from '~/middlewares/validateBodyMiddleware'
import { createRoleSchema } from '~/schemaValidations/roleSchemaValidation'

const Router = express.Router()

Router.post('/', validateBodyMiddleware(createRoleSchema), roleController.createRole)

export const roleRoutes = Router
