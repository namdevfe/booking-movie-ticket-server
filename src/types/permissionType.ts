import mongoose from 'mongoose'

export interface Permission {
  _id: mongoose.Types.ObjectId
  name: string
  description: string
  action: string
  code: string
}