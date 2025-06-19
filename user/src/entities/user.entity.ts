import { User } from '@prisma/client'

export class UserEntity implements User {
  userId: string
  name: string
  email: string
  password: string
  role: UserRole
  createdAt: Date
  updatedAt: Date
}

export const UserRole = {
  ADMIN: 'ADMIN',
  PROVIDER: 'PROVIDER',
  CLIENT: 'CLIENT',
} as const

export type UserRole = (typeof UserRole)[keyof typeof UserRole]
