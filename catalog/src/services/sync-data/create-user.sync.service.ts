import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/database/prisma/prisma.service'
import { UserEntity } from 'src/entities/user.entity'

@Injectable()
export class SyncronizeUserCreation {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(userEntity: UserEntity): Promise<void> {
    await this.prismaService.user.create({ data: userEntity })
  }
}
