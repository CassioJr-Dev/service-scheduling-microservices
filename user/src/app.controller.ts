import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common'
import { CreateUserService } from './services/create-user/create-user.service'
import { UpdateUserService } from './services/update-user/update-user.service'
import { FindUserService } from './services/find-user/find-user.service'
import { DeleteUserService } from './services/delete-user/delete-user.service'
import { CreateUserDto } from './dtos/create-user.dto'
import { UpdateUserDto } from './dtos/update-user.dto'
import { ClientProxy } from '@nestjs/microservices'
import { RabbitmqService } from './rabbitmq/rabbitmq.service'

@Controller('user')
export class AppController {
  constructor(
    private readonly rabbitMqService: RabbitmqService,
    private readonly createUserService: CreateUserService,
    private readonly updateUserService: UpdateUserService,
    private readonly findUserService: FindUserService,
    private readonly deleteUserService: DeleteUserService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const { password, ...user } =
      await this.createUserService.execute(createUserDto)
    await this.rabbitMqService.publishInExchange(
      'user.exchange',
      'user.created',
      JSON.stringify({
        ...user,
        password,
      }),
    )

    return user
  }

  @Patch(':userId')
  async update(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const { password, ...user } = await this.updateUserService.execute({
      userId,
      ...updateUserDto,
    })
    await this.rabbitMqService.publishInExchange(
      'user.exchange',
      'user.updated',
      JSON.stringify({
        ...user,
        password,
      }),
    )
    return user
  }

  @Get(':userId')
  async find(@Param('userId', ParseUUIDPipe) userId: string) {
    return this.findUserService.execute(userId)
  }

  @HttpCode(204)
  @Delete(':userId')
  async delete(@Param('userId', ParseUUIDPipe) userId: string) {
    await this.deleteUserService.execute(userId)
    await this.rabbitMqService.publishInExchange(
      'user.exchange',
      'user.deleted',
      JSON.stringify({ userId }),
    )
  }
}
