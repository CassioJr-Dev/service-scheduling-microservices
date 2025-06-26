import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common'
import { CreateCatalogService } from './services/create-catalog/create-catalog.service'
import { UpdateCatalogService } from './services/update-catalog/update-catalog.service'
import { FindCatalogService } from './services/find-catalog/find-catalog.service'
import { DeleteCatalogService } from './services/delete-catalog/delete-catalog.service'
import { CreateCatalogDto } from './dtos/create-catalog.dto'
import { UpdateCatalogDto } from './dtos/update-catalog.dto'

@Controller('catalog')
export class AppController {
  constructor(
    private readonly createCatalogService: CreateCatalogService,
    private readonly updateCatalogService: UpdateCatalogService,
    private readonly findCatalogService: FindCatalogService,
    private readonly deleteCatalogService: DeleteCatalogService,
  ) {}

  @Post(':providerId')
  async create(
    @Body() createCatalogDto: CreateCatalogDto,
    @Param('providerId', ParseUUIDPipe) providerId: string,
  ) {
    return this.createCatalogService.execute(providerId, createCatalogDto)
  }

  @Patch(':providerId/:catalogId')
  async update(
    @Param('providerId', ParseUUIDPipe) providerId: string,
    @Param('catalogId', ParseUUIDPipe) catalogId: string,
    @Body() updateCatalogDto: UpdateCatalogDto,
  ) {
    return this.updateCatalogService.execute(
      providerId,
      catalogId,
      updateCatalogDto,
    )
  }

  @Get(':catalogId')
  async find(@Param('catalogId', ParseUUIDPipe) catalogId: string) {
    return this.findCatalogService.execute(catalogId)
  }

  @HttpCode(204)
  @Delete(':providerId/:catalogId')
  async delete(
    @Param('providerId', ParseUUIDPipe) providerId: string,
    @Param('catalogId', ParseUUIDPipe) catalogId: string,
  ) {
    await this.deleteCatalogService.execute(providerId, catalogId)
  }
}
