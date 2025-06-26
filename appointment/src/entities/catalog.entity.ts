import { Catalog } from '@prisma/client'

export class CatalogEntity implements Catalog {
  catalogId: string
  name: string
  description: string
  isActive: boolean
  providerId: string
  createdAt: Date
  updatedAt: Date
}
