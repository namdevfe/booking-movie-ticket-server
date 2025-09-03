import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import roleService from '~/services/roleService'

const createRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await roleService.createRole(req.body)
    res.status(response?.statusCode || StatusCodes.CREATED).json(response)
  } catch (error) {
    next(error)
  }
}

// Export Controller
const roleController = {
  createRole
}

export default roleController
