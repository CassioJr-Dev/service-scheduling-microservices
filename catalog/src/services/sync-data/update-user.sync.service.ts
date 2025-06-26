import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/database/prisma/prisma.service'
import { UserEntity } from 'src/entities/user.entity'

@Injectable()
export class SyncronizeUserUpdate {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(userEntity: UserEntity): Promise<void> {
    const { userId, ...user } = userEntity
    await this.prismaService.user.update({
      where: { userId },
      data: user,
    })
  }
}
