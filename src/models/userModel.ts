import { model, Schema } from 'mongoose'

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String },
  fullName: { type: String, required: true },
  dateOfBirth: { type: Date },
  phoneNumber: { type: String },
  role: { type: String }
})

const User = model('User', userSchema)

export default User