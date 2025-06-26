import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { PrismaService } from 'src/database/prisma/prisma.service'
import { CatalogEntity } from 'src/entities/catalog.entity'

export type UpdateCatalogInput = {
  name?: string
  description?: string
  isActive?: boolean
}

@Injectable()
export class UpdateCatalogService {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(
    providerId: string,
    catalogId: string,
    input: UpdateCatalogInput,
  ): Promise<CatalogEntity> {
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

    const hasAtLeastOneProperty = Object.values(input).some(
      value => value !== undefined,
    )
    if (!hasAtLeastOneProperty) {
      throw new BadRequestException('At least one property must be provided')
    }

    const updateCatalog = await this.prismaService.catalog.update({
      where: {
        catalogId,
      },
      data: { ...input },
    })

    return updateCatalog
  }
}
