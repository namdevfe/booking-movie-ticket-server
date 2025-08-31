import { model, Schema } from 'mongoose'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import { User } from '~/types/userType'

type UserMethods = {
  createResetPasswordToken: () => string
}

type UserDocument = User & Document & UserMethods

const userSchema = new Schema<UserDocument>({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  phoneNumber: { type: String, unique: true },
  dateOfBirth: { type: Date },
  password: { type: String },
  isActive: { type: Boolean, default: false },
  role: { type: String },
  refreshToken: { type: String, default: null },
  otpCode: { type: String, required: false, default: null },
  otpExpiresIn: { type: Number, required: false, default: null },
  resetPasswordToken: { type: String, default: null },
  resetPasswordExpiresIn: { type: Number, default: null }
})

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next()

  // Hash passowrd
  const salt = await bcrypt.genSalt(10)
  this.password =  await bcrypt.hash(this.password as string, salt)

  next()
})

userSchema.methods = {
  createResetPasswordToken: function() {
    const resetToken = crypto.randomBytes(32).toString('hex')
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')
    this.resetPasswordExpiresIn = Date.now() + (5 * 60 * 1000)
    return resetToken
  }
}

const User = model('User', userSchema)

export default User