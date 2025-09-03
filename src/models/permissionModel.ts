import { model, Schema } from 'mongoose'
import type { Permission } from '~/types/permissionType'

// Types Defination
type PermissionDocument = Permission & Document

// Collection Name Defination
export const PERMISSION_COLLECTION_NAME = 'Permission'

// Collection Name Defination
const permissionSchema = new Schema<PermissionDocument>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    code: { type: String, required: true, unique: true },
    action: {
      type: String,
      required: true,
      enum: ['create', 'read', 'update', 'delete', 'list', 'detail', 'self_detail']
    }
  },
  { timestamps: true }
)

const Permission = model(PERMISSION_COLLECTION_NAME, permissionSchema)

export default Permission
