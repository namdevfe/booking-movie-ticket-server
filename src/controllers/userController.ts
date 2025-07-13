import { Request, Response } from "express"
import userService from "~/services/userService"

const createUser = async (req: Request, res: Response) => {
  try {
    const response = await userService.createUser(req.body)
    res.status(201).json(response)
  } catch (error) {
    console.log('🚀error---->', error);
  }
}

const userController = {
  createUser
}

export default userController