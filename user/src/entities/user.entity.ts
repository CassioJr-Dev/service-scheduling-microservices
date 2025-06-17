export class UserEntity {
  userId: string
  name: string
  email: string
  password: string
  role: UserRole
  createdAt: Date
  updateAt: Date
}

export enum UserRole {
  ADMIN = 'ADMIN',
  PROVIDER = 'PROVIDER',
  CLIENT = 'CLIENT',
}
