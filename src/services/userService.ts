import { StatusCodes } from "http-status-codes";
import User from "~/models/userModel";
import { ApiResponse } from "~/types/api";
import { CreateUserPayload, User as UserType } from "~/types/userType";
import ApiError from "~/utils/ApiError";

const createUser = async (payload: CreateUserPayload): Promise<ApiResponse<UserType>> => {
  const { email, username, password, fullName, dateOfBirth, phoneNumber } = payload
  
  try {
    // Check email
    const existingUser = await User.findOne({
      $or: [
        { email },
        { username },
        { phoneNumber }
      ]
    })

    if (existingUser) {
      throw new ApiError(StatusCodes.CONFLICT, 'Email, username or phoneNumber has already exists')
    }

    const createdUser = new User(payload)
    await createdUser.save()

    // Send email

    return createdUser._id && { statusCode: StatusCodes.CREATED, message: 'Created new user is successfully' }
  } catch (error) {
    throw error
  }
}

const userService = {
  createUser
}

export default userService
