import mongoose from 'mongoose'
import { ENV } from '~/config/environment'
import { PERMISSIONS } from '~/constants/permission'
import Permission from '~/models/permissionModel'

const seedPermissions = async () => {
  await mongoose.connect(`${ENV.MONGODB_URI}`)

  // Xóa dữ liệu cũ
  await Permission.deleteMany({})

  // Seed mới
  await Permission.insertMany([
    // User
    { name: 'Tạo người dùng', code: PERMISSIONS.USER.CREATE, action: 'create' },
    { name: 'Danh sách người dùng', code: PERMISSIONS.USER.LIST, action: 'list' },
    { name: 'Chi tiết người dùng', code: PERMISSIONS.USER.DETAIL, action: 'detail' },
    { name: 'Chi tiết bản thân', code: PERMISSIONS.USER.SELF_DETAIL, action: 'detail' },
    { name: 'Cập nhật người dùng', code: PERMISSIONS.USER.UPDATE, action: 'update' },
    { name: 'Xóa người dùng', code: PERMISSIONS.USER.DELETE, action: 'delete' },

    // Role
    { name: 'Tạo vai trò', code: PERMISSIONS.ROLE.CREATE, action: 'create' },
    { name: 'Danh sách vai trò', code: PERMISSIONS.ROLE.LIST, action: 'list' },
    { name: 'Chi tiết vai trò', code: PERMISSIONS.ROLE.DETAIL, action: 'detail' },
    { name: 'Cập nhật vai trò', code: PERMISSIONS.ROLE.UPDATE, action: 'update' },
    { name: 'Xóa vai trò', code: PERMISSIONS.ROLE.DELETE, action: 'delete' }
  ])

  console.log('✅ Seed permissions done!')
  process.exit(0)
}

seedPermissions().catch((err) => {
  console.error('❌ Seed failed:', err)
  process.exit(1)
})
