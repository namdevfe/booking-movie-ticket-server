import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import User from '~/models/userModel'
import { AuthRequest } from '~/types/common'
import { Role } from '~/types/roleType'
import ApiError from '~/utils/ApiError'

const authorizeMiddleware =
  (requiredPermissions: string[]) =>
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      /**
       * - Have userId from req.user
       * - Find role of user
       * - Find permissions by role
       * - Check permssions in database with permissions passed outside
       */

      const userId = req.user?.userId
      const existingUser = await User.findById(userId).populate('roles')

      if (!existingUser) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'User not found!')
      }

      // Check permissions
      const roles = existingUser?.roles as Role[]
      const userPermissions = [...new Set(roles?.flatMap((role) => role.permissions))]
      const hasPermission =
        userPermissions.length > 0 &&
        requiredPermissions.some((permission) => userPermissions.includes(permission))

      if (!hasPermission) {
        throw new ApiError(StatusCodes.FORBIDDEN, 'Permission denied!')
      }

      next()
    } catch (error) {
      next(error)
    }
  }

export default authorizeMiddleware
