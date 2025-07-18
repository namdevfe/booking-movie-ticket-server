import express from 'express'
import { authRoutes } from '~/routes/v1/authRoute'
import { userRoutes } from '~/routes/v1/userRoute'

const Router = express.Router()

Router.use('/users', userRoutes)
Router.use('/auth', authRoutes)

export const APIs_V1 = Router