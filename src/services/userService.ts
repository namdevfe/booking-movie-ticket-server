import { StatusCodes } from "http-status-codes";
import User from "~/models/userModel";
import { sendMail } from "~/providers/sendMailProvider";
import { ApiResponse } from "~/types/api";
import { CreateUserPayload, UpdateUserPayload, User as UserType } from "~/types/userType";
import ApiError from "~/utils/ApiError";

const createUser = async (payload: CreateUserPayload): Promise<ApiResponse<UserType>> => {
  const { email, username, phoneNumber } = payload
  
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
    await sendMail({ email: createdUser.email, subject: 'Welcome to Booking Movie Ticket System', content: 'Welcome' })

    const { password: excludePassword, ...userResponse } = createdUser.toObject()

    return createdUser._id && { statusCode: StatusCodes.CREATED, message: 'Created new user is successfully', data: userResponse }
  } catch (error) {
    throw error
  }
}

const updateUserById = async (userId: string, payload: UpdateUserPayload): Promise<ApiResponse<UserType>> => {
  try {
    const updatedUser = await User.findOneAndUpdate({ _id: userId }, payload, { new: true })

    if (!updatedUser) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'User not found')
    }

    const { password: excludePassword, ...userResponse } = updatedUser.toObject()

    return { statusCode: StatusCodes.OK, message: 'Updated user is successfully', data: userResponse }
  } catch (error) {
    throw error
  }
}

const userService = {
  createUser,
  updateUserById
}

export default userService
