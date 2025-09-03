export const PERMISSIONS = {
  // Role Module
  ROLE: {
    CREATE: 'role:create',
    UPDATE: 'role:update',
    DELETE: 'role:delete',
    LIST: 'role:list',
    DETAIL: 'role:detail'
  },

  // User Module
  USER: {
    CREATE: 'user:create',
    UPDATE: 'user:update',
    DELETE: 'user:delete',
    LIST: 'user:list',
    DETAIL: 'user:detail',
    SELF_DETAIL: 'user:self_detail'
  }
} as const
