import mongoose from 'mongoose'

export interface Role {
  _id: mongoose.Types.ObjectId
  name: string
  description?: string
  permissions: string[]
  isDefault?: boolean
}

export type CreateRolePayload = Pick<Role, 'name' | 'description' | 'isDefault'>

export type UpdateRolePayload = Omit<Role, '_id'>
