import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { PrismaService } from 'src/database/prisma/prisma.service'
import { CatalogEntity } from 'src/entities/catalog.entity'

@Injectable()
export class FindCatalogService {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(catalogId: string): Promise<CatalogEntity> {
    if (!catalogId) {
      throw new BadRequestException(`Field catalogId is required`)
    }

    const findCatalog = await this.prismaService.catalog.findUnique({
      where: {
        catalogId,
      },
    })

    if (!findCatalog) {
      throw new NotFoundException('User not found')
    }

    return findCatalog
  }
}
