import { StatusCodes } from "http-status-codes";
import User from "~/models/userModel";
import { ApiResponse } from "~/types/api";
import { LoginPayload, LoginResponse } from "~/types/authType";
import ApiError from "~/utils/ApiError";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { ENV } from "~/config/environment";
import { generateAccessToken, generateRefreshToken } from "~/utils/jwt";

const login = async (payload: LoginPayload): Promise<ApiResponse<LoginResponse>> => {
  try {
    const { email, username, password } = payload

    // Check email, username
    const existingUser = await User.findOne({
      $or: [
        { email },
        { username },
      ]
    })

    if (!existingUser) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Email or username incorrect')
    }

    // Check password
    const isCorrectPassword = await bcrypt.compare(password as string, existingUser.password as string)
    if (!isCorrectPassword) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, 'Password incorrect')
    }

    // Create access token and refresh token
    const accessToken = generateAccessToken({ userId: existingUser._id.toString() })
    const refreshToken = generateRefreshToken({ userId: existingUser._id.toString() })

    // Save refresh token to database
    existingUser.refreshToken = refreshToken
    await existingUser.save()

    // Return response for client
    return { 
      statusCode: StatusCodes.OK, 
      message: 'Login is successfully', 
      data: { accessToken, refreshToken }
    }
  } catch (error) {
    throw error
  }
}

const authService = {
  login
}

export default authService