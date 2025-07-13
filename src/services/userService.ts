import User from "~/models/userModel";
import { CreateUserPayload } from "~/types/userType";

const createUser = async (payload: CreateUserPayload): Promise<any> => {
  // const { email, username, password, fullName, dateOfBirth, phoneNumber } = payload
  
  try {
    const createdUser = new User(payload)
    await createdUser.save()
  } catch (error) {
    throw error
  }
}

const userService = {
  createUser
}

export default userService
