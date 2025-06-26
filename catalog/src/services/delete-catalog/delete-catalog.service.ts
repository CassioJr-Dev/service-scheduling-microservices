import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { PrismaService } from 'src/database/prisma/prisma.service'

@Injectable()
export class DeleteCatalogService {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(providerId: string, catalogId: string): Promise<void> {
    if (!providerId) {
      throw new BadRequestException(`Field providerId is required`)
    }
    if (!catalogId) {
      throw new BadRequestException(`Field catalogId is required`)
    }

    const [provider, catalog] = await Promise.all([
      this.prismaService.user.findUnique({ where: { userId: providerId } }),
      this.prismaService.catalog.findUnique({ where: { catalogId } }),
    ])

    if (!provider) {
      throw new NotFoundException('Provider not found')
    }

    if (!catalog) {
      throw new NotFoundException('Catalog not found')
    }

    if (provider.userId !== catalog.providerId) {
      throw new ForbiddenException(
        'You do not have permission to access this catalog',
      )
    }

    await this.prismaService.catalog.delete({
      where: {
        catalogId,
      },
    })

    return
  }
}
