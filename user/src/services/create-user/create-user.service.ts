import { ConflictException, Injectable } from '@nestjs/common'
import { randomUUID } from 'node:crypto'
import { PrismaService } from 'src/database/prisma/prisma.service'
import { UserEntity, UserRole } from 'src/entities/user.entity'
import { BcryptjsHashProvider } from 'src/providers/bcryptjs-hash.provider'

export type CreateUserInput = {
  name: string
  email: string
  password: string
  role: UserRole
}

@Injectable()
export class CreateUserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly hashProvider: BcryptjsHashProvider,
  ) {}

  async execute(input: CreateUserInput): Promise<UserEntity> {
    const { name, email, password, role } = input

    const emailExists = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    })

    if (emailExists) {
      throw new ConflictException('Email Exists')
    }

    const userId = randomUUID()
    const hashPassword = await this.hashProvider.generateHash(password)

    const user = await this.prismaService.user.create({
      data: {
        userId,
        name,
        email,
        password: hashPassword,
        role,
      },
    })

    return user
  }
}
