import express from 'express'
import { userRoutes } from '~/routes/v1/userRoute'

const Router = express.Router()

Router.use('/users', userRoutes)

export const APIs_V1 = Router