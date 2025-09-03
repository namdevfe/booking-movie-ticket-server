import mongoose from 'mongoose'

export interface Role {
  _id: mongoose.Types.ObjectId
  name: string
  description?: string
  permissions: mongoose.Types.ObjectId[]
  isDefault?: boolean
}

export type CreateRolePayload = Pick<Role, 'name' | 'description' | 'isDefault'>
