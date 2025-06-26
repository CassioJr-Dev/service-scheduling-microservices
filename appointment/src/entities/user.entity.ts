import { User, UserRole } from '@prisma/client'

export class UserEntity implements User {
  userId: string
  name: string
  email: string
  password: string
  role: UserRole
  createdAt: Date
  updatedAt: Date
}
