import express from 'express'
import authenticateMiddleware from '~/middlewares/authenticateMiddleware'
import { authRoutes } from '~/routes/v1/authRoute'
import { roleRoutes } from '~/routes/v1/roleRoute'
import { userRoutes } from '~/routes/v1/userRoute'

const Router = express.Router()

Router.use(authenticateMiddleware)
Router.use('/auth', authRoutes)
Router.use('/users', userRoutes)
Router.use('/roles', roleRoutes)

export const APIs_V1 = Router
