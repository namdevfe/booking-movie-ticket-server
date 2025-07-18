import mongoose from "mongoose"

export interface User {
  _id?: mongoose.Types.ObjectId
  email: string,
  username: string,
  password?: string,
  fullName: string,
  dateOfBirth?: NativeDate | Date | string | null,
  phoneNumber?: string | null,
  role?: string | null
  isActive?: boolean
}

export type CreateUserPayload = Omit<User, '_id' | 'role'>
export type UpdateUserPayload = Omit<User, '_id' | 'role'> 