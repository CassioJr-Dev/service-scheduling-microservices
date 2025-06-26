import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { PrismaService } from 'src/database/prisma/prisma.service'

@Injectable()
export class DeleteUserService {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(userId: string): Promise<void> {
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

    await this.prismaService.user.delete({
      where: {
        userId,
      },
    })

    return
  }
}
