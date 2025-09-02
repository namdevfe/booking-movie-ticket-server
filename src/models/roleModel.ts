import { model, Schema } from 'mongoose'
import { PERMISSION_COLLECTION_NAME } from '~/models/permissionModel'
import type { Role } from '~/types/roleType'

// Types Defination
type RoleDocument = Role & Document

// Collection Name Defination
export const ROLE_COLLECTION_NAME = 'Role'

// Collection Name Defination
const roleSchema = new Schema<RoleDocument>({
  name: { type: String, required: true },
  permissions: [{ type: Schema.ObjectId, ref: PERMISSION_COLLECTION_NAME }]
}, { timestamps: true })

const Role = model(ROLE_COLLECTION_NAME, roleSchema)

export default Role