import express, { Request, Response } from 'express'
import User from '~/models/userModel'

const Router = express.Router()

Router.route('/')
  .post(async (req: Request, res: Response) => {
    const { email, username, password, fullName } = req.body
    const createdUser = new User({ email, username, password, fullName })
    await createdUser.save()
    res.status(201).json(createdUser)
  })
  .get((req: Request, res: Response) => {
    res.send('GET LIST USERS API')
  })

export const userRoutes = Router
