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

const deleteRole = async (id: string): Promise<ApiResponse | undefined> => {
  try {
    const existingRole = await Role.findById(id)
    if (!existingRole) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Role not found!')
    }

    const deletedRole = await Role.findByIdAndDelete(id)
    if (deletedRole?._id) {
      return {
        statusCode: StatusCodes.OK,
        message: 'Deleted role is successfully',
        data: deletedRole
      }
    }
  } catch (error) {
    throw error
  }
}

const getRoleDetails = async (id: string): Promise<ApiResponse> => {
  try {
    // Check roleId valid
    const isValidRoleId = mongoose.isValidObjectId(id)
    if (!isValidRoleId) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Role id invalid!')
    }

    // Get role details
    const roleDetails = await Role.findById(id)
    if (!roleDetails) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Role not found!')
    }

    // Return response
    return {
      statusCode: StatusCodes.OK,
      message: 'Get role details is successfully',
      data: roleDetails
    }
  } catch (error) {
    throw error
  }
}

const getRoles = async (): Promise<ApiResponse> => {
  try {
    const roles = await Role.find()
    return {
      statusCode: StatusCodes.OK,
      message: 'Get roles are successfully',
      data: roles
    }
  } catch (error) {
    throw error
  }
}

const roleService = { createRole, updateRole, deleteRole, getRoleDetails, getRoles }

export default roleService
