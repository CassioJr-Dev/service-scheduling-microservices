import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { CreateUserService } from './services/create-user/create-user.service'
import { DatabaseModule } from './database/database.module'
import { BcryptjsHashProvider } from './providers/bcryptjs-hash.provider'
import { UpdateUserService } from './services/update-user/update-user.service'
import { FindUserService } from './services/find-user/find-user.service'
import { DeleteUserService } from './services/delete-user/delete-user.service'
import { RabbitmqModule } from './rabbitmq/rabbitmq.module'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    RabbitmqModule,
  ],
  controllers: [AppController],
  providers: [
    BcryptjsHashProvider,
    CreateUserService,
    UpdateUserService,
    FindUserService,
    DeleteUserService,
  ],
})
export class AppModule {}
