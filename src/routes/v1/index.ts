import express from 'express'
import authenticateMiddleware from '~/middlewares/authenticateMiddleware'
import { authRoutes } from '~/routes/v1/authRoute'
import { userRoutes } from '~/routes/v1/userRoute'

const Router = express.Router()

Router.use(authenticateMiddleware)
Router.use('/auth', authRoutes)
Router.use('/users', userRoutes)

export const APIs_V1 = Router