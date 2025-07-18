import { model, Schema } from 'mongoose'

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  phoneNumber: { type: String, unique: true },
  dateOfBirth: { type: Date },
  password: { type: String },
  isActive: { type: Boolean, default: false },
  role: { type: String }
})

const User = model('User', userSchema)

export default User