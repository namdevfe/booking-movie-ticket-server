import { model, Schema } from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  phoneNumber: { type: String, unique: true },
  dateOfBirth: { type: Date },
  password: { type: String },
  isActive: { type: Boolean, default: false },
  role: { type: String },
  refreshToken: { type: String, default: null },
  otpCode: { type: String, default: null },
  otpExpiresIn: { type: Number, default: null }
})

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next()

  // Hash passowrd
  const salt = await bcrypt.genSalt(10)
  this.password =  await bcrypt.hash(this.password as string, salt)

  next()
})

const User = model('User', userSchema)

export default User