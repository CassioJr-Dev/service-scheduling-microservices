/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/database/prisma/prisma.service'

@Injectable()
export class SyncronizeUserDeletion {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(userId: string): Promise<void> {
    const id = JSON.parse(userId)
    await this.prismaService.user.delete({ where: { userId: id?.userId } })
  }
}
