import { StatusCodes } from 'http-status-codes'
import mongoose from 'mongoose'
import Role from '~/models/roleModel'
import { ApiResponse } from '~/types/api'
import { CreateRolePayload, UpdateRolePayload } from '~/types/roleType'
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

const updateRole = async (id: string, reqBody: UpdateRolePayload): Promise<ApiResponse | undefined> => {
  const { name } = reqBody
  try {
    // Check id valid
    if (!mongoose.isValidObjectId(id)) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Role id invalid!')
    }

    // Check role had already exist
    const existingRole = await Role.findOne({ name, _id: { $ne: id } })
    if (existingRole) {
      throw new ApiError(StatusCodes.CONFLICT, 'Role had already exist!')
    }

    // Update role
    const updatedRole = await Role.findByIdAndUpdate(id, { ...reqBody }, { new: true })
    if (!updatedRole) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Role not found!')
    }

    // Return response
    return {
      statusCode: StatusCodes.OK,
      message: 'Updated role is successfully',
      data: updatedRole
    }
  } catch (error) {
    throw error
  }
}

const roleService = { createRole, updateRole }

export default roleService
