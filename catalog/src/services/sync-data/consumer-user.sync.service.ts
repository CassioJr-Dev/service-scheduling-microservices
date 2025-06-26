/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, OnModuleInit } from '@nestjs/common'
import { RabbitmqService } from '../../rabbitmq/rabbitmq.service'
import { SyncronizeUserCreation } from './create-user.sync.service'
import { SyncronizeUserUpdate } from './update-user.sync.service'
import { SyncronizeUserDeletion } from './delete-user.sync.service'
import { UserEntity } from '../../entities/user.entity'

@Injectable()
export class ConsumerUserService implements OnModuleInit {
  constructor(
    private readonly rabbitmqService: RabbitmqService,
    private readonly syncronizeUserCreation: SyncronizeUserCreation,
    private readonly syncronizeUserUpdate: SyncronizeUserUpdate,
    private readonly syncronizeUserDeletion: SyncronizeUserDeletion,
  ) {}

  async onModuleInit() {
    await this.rabbitmqService.consume('user_queue', async message => {
      const routingKey = message.fields.routingKey
      const messageContent = message.content.toString()

      switch (routingKey) {
        case 'user.created': {
          const user: UserEntity = JSON.parse(messageContent)
          await this.syncronizeUserCreation.execute(user)
          break
        }
        case 'user.updated': {
          const user: UserEntity = JSON.parse(messageContent)
          await this.syncronizeUserUpdate.execute(user)
          break
        }
        case 'user.deleted': {
          const userId: string = messageContent
          await this.syncronizeUserDeletion.execute(userId)
          break
        }
        default:
          console.warn(`RoutingKey desconhecida: ${routingKey}`)
          break
      }
    })
  }
}
