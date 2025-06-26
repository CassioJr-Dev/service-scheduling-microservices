import { Inject, Injectable, OnModuleInit } from '@nestjs/common'
import { Channel, Message } from 'amqplib'

import { RabbitMQProviderType } from './rabbitmq.provider'

type Queque = 'user_queue'
type Exchange = 'amq.direct' | 'user.exchange'
type RoutingKey = 'rmq-process'

@Injectable()
export class RabbitmqService implements OnModuleInit {
  ack(message: Message) {
    throw new Error('Method not implemented.')
  }
  private channel: Channel

  constructor(
    @Inject('RABBITMQ_PROVIDER')
    private readonly rabbitMQProvider: RabbitMQProviderType,
  ) {}

  async onModuleInit() {
    await this.start()
    await this.channel.assertQueue('user_queue', { durable: true })
    await this.channel.bindQueue('user_queue', 'user.exchange', 'user.#')
  }

  async start() {
    if (!this.channel) this.channel = await this.rabbitMQProvider
  }

  async consume(queue: Queque, callback?: (message: Message) => void) {
    return this.channel.consume(queue, message => {
      if (message === null) return
      if (callback) callback(message)
      this.channel.ack(message)
    })
  }
}
