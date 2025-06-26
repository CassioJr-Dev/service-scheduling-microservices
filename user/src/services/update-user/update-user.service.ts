import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { PrismaService } from 'src/database/prisma/prisma.service'
import { UserEntity, UserRole } from 'src/entities/user.entity'
import { BcryptjsHashProvider } from 'src/providers/bcryptjs-hash.provider'

export type UpdateUserInput = {
  userId: string
  name?: string
  email?: string
  password?: string
  role?: UserRole
}

@Injectable()
export class UpdateUserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly hashProvider: BcryptjsHashProvider,
  ) {}

  async execute(input: UpdateUserInput): Promise<UserEntity> {
    const { userId, ...userPropertys } = input

    if (!userId) {
      throw new BadRequestException(`Field id is required`)
    }

    const findUser = await this.prismaService.user.findUnique({
      where: {
        userId,
      },
    })

    if (!findUser) {
      throw new NotFoundException('User not found')
    }

    const hasAtLeastOneProperty = Object.values(userPropertys).some(
      value => value !== undefined,
    )
    if (!hasAtLeastOneProperty) {
      throw new BadRequestException('At least one property must be provided')
    }

    if (userPropertys.email) {
      const emailExists = await this.prismaService.user.findUnique({
        where: {
          email: userPropertys.email,
        },
      })

      if (emailExists) throw new ConflictException('Email Exists')
    }

    if (userPropertys.password) {
      const generateHash = await this.hashProvider.generateHash(
        userPropertys.password,
      )
      userPropertys.password = generateHash
    }

    const updateUser = await this.prismaService.user.update({
      where: {
        userId,
      },
      data: { ...userPropertys },
    })

    return updateUser
  }
}
