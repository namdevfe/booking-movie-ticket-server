import { StatusCodes } from 'http-status-codes'
import Role from '~/models/roleModel'
import { ApiResponse } from '~/types/api'
import { CreateRolePayload } from '~/types/roleType'
import ApiError from '~/utils/ApiError'

const createRole = async (reqBody: CreateRolePayload): Promise<ApiResponse | undefined> => {
  const { name } = reqBody
  try {
    // Check role had already exist
    const existingRole = await Role.findOne({ name })
    if (existingRole) {
      throw new ApiError(StatusCodes.CONFLICT, 'Role had already exist!')
    }

    // Create new role
    const createdRole = await Role.create({ ...reqBody })
    if (createdRole._id) {
      return {
        statusCode: StatusCodes.CREATED,
        message: 'Created new role is successfully',
        data: createdRole
      }
    }
  } catch (error) {
    throw error
  }
}

const roleService = { createRole }

export default roleService
