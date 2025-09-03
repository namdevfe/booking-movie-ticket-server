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

const updateRole = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  try {
    const response = await roleService.updateRole(id, req.body)
    res.status(response?.statusCode || StatusCodes.OK).json(response)
  } catch (error) {
    next(error)
  }
}

// Export Controller
const roleController = {
  createRole,
  updateRole
}

export default roleController
