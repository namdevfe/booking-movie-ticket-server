import mongoose from 'mongoose'

export interface Role {
  _id: mongoose.Types.ObjectId
  name: string
  permissions: mongoose.Types.ObjectId[]
}