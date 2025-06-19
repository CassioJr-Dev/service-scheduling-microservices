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
import { CreateUserService } from './services/create-user/create-user.service'
import { UpdateUserService } from './services/update-user/update-user.service'
import { FindUserService } from './services/find-user/find-user.service'
import { DeleteUserService } from './services/delete-user/delete-user.service'
import { CreateUserDto } from './dtos/create-user.dto'
import { UpdateUserDto } from './dtos/update-user.dto'

@Controller('user')
export class AppController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly updateUserService: UpdateUserService,
    private readonly findUserService: FindUserService,
    private readonly deleteUserService: DeleteUserService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.createUserService.execute(createUserDto)
  }

  @Patch(':userId')
  async update(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.updateUserService.execute({ userId, ...updateUserDto })
  }

  @Get(':userId')
  async find(@Param('userId', ParseUUIDPipe) userId: string) {
    return this.findUserService.execute(userId)
  }

  @HttpCode(204)
  @Delete(':userId')
  async delete(@Param('userId', ParseUUIDPipe) userId: string) {
    await this.deleteUserService.execute(userId)
  }
}
