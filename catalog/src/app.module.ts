import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { DatabaseModule } from './database/database.module'
import { CreateCatalogService } from './services/create-catalog/create-catalog.service'
import { UpdateCatalogService } from './services/update-catalog/update-catalog.service'
import { FindCatalogService } from './services/find-catalog/find-catalog.service'
import { DeleteCatalogService } from './services/delete-catalog/delete-catalog.service'
import { ConsumerUserService } from './services/sync-data/consumer-user.sync.service'
import { ConfigModule } from '@nestjs/config'
import { RabbitmqModule } from './rabbitmq/rabbitmq.module'
import { SyncronizeUserCreation } from './services/sync-data/create-user.sync.service'
import { SyncronizeUserDeletion } from './services/sync-data/delete-user.sync.service'
import { SyncronizeUserUpdate } from './services/sync-data/update-user.sync.service'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RabbitmqModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [
    CreateCatalogService,
    UpdateCatalogService,
    FindCatalogService,
    DeleteCatalogService,
    ConsumerUserService,
    SyncronizeUserCreation,
    SyncronizeUserDeletion,
    SyncronizeUserUpdate,
  ],
})
export class AppModule {}
