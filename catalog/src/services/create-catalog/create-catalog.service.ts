import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { randomUUID } from 'node:crypto'
import { PrismaService } from 'src/database/prisma/prisma.service'
import { CatalogEntity } from 'src/entities/catalog.entity'

export type CreateCatalogInput = {
  name: string
  description: string
  isActive?: boolean
}

@Injectable()
export class CreateCatalogService {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(
    providerId: string,
    input: CreateCatalogInput,
  ): Promise<CatalogEntity> {
    const { name, description, isActive = true } = input

    const userExists = await this.prismaService.user.findUnique({
      where: {
        userId: providerId,
      },
    })

    if (!userExists) {
      throw new NotFoundException('Provider not found')
    }

    if (userExists.role !== 'PROVIDER') {
      throw new ForbiddenException(
        'only users of type PROVIDER are allowed to perform this action',
      )
    }

    const catalogId = randomUUID()

    const createCatalog = await this.prismaService.catalog.create({
      data: {
        catalogId,
        name,
        description,
        isActive,
        providerId,
      },
    })

    return createCatalog
  }
}
