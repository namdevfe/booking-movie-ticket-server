import mongoose from "mongoose"

export interface User {
  _id?: mongoose.Types.ObjectId
  email: string,
  username: string,
  password: string,
  fullName: string,
  dateOfBirth: Date,
  phoneNumber: string,
  role: string
}

export type CreateUserPayload = Omit<User, 'role'>