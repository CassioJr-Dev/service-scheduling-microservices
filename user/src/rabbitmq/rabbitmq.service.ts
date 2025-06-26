import { Inject, Injectable, OnModuleInit } from '@nestjs/common'
import { Channel } from 'amqplib'

import { RabbitMQProviderType } from './rabbitmq.provider'

type Exchange = 'user.exchange'
type RoutingKey = 'user.created' | 'user.updated' | 'user.deleted'

@Injectable()
export class RabbitmqService implements OnModuleInit {
  private channel: Channel

  constructor(
    @Inject('RABBITMQ_PROVIDER')
    private readonly rabbitMQProvider: RabbitMQProviderType,
  ) {}

  async onModuleInit() {
    await this.start()
    await this.channel.assertExchange('user.exchange', 'topic', {
      durable: true,
    })
  }

  async start() {
    if (!this.channel) this.channel = await this.rabbitMQProvider
  }

  async publishInExchange(
    exchange: Exchange,
    routingKey: RoutingKey,
    message: string,
  ) {
    return this.channel.publish(exchange, routingKey, Buffer.from(message))
  }
}
