import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CreateUserService } from './services/create-user/create-user.service'
import { DatabaseModule } from './database/database.module'
import { BcryptjsHashProvider } from './providers/bcryptjs-hash.provider'
import { UpdateUserService } from './services/update-user/update-user.service'
import { FindUserService } from './services/find-user/find-user.service';
import { DeleteUserService } from './services/delete-user/delete-user.service';

@Module({
  imports: [DatabaseModule],
  controllers: [AppController],
  providers: [
    AppService,
    BcryptjsHashProvider,
    CreateUserService,
    UpdateUserService,
    FindUserService,
    DeleteUserService,
  ],
})
export class AppModule {}
