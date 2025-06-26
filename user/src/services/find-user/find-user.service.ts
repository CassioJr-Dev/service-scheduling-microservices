import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { PrismaService } from 'src/database/prisma/prisma.service'
import { UserEntity } from 'src/entities/user.entity'

@Injectable()
export class FindUserService {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(userId: string): Promise<UserEntity> {
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

    return findUser
  }
}
