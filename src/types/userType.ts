import mongoose from "mongoose"

export interface User {
  _id?: mongoose.Types.ObjectId
  email: string,
  username: string,
  password?: string | null,
  fullName: string,
  dateOfBirth?: NativeDate | Date | string | null,
  phoneNumber?: string | null,
  role?: string | null
  refreshToken?: string | null 
  isActive?: boolean
}

export type CreateUserPayload = Omit<User, '_id' | 'role' | 'refreshToken'>
export type UpdateUserPayload = Omit<User, '_id' | 'role' | 'refreshToken'>
export type GetProfileResponse = Omit<User, 'refreshToken'>