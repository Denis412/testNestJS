import { OnModuleInit } from '@nestjs/common';
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { CreateMessageInput } from 'src/message/dto/create-message.input';
import { MessageService } from 'src/message/message.service';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:8080', 'http://localhost:8081'],
  },
})
export class myGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  constructor(private readonly messageService: MessageService) {}

  onModuleInit() {
    this.server.on('connection', () => {
      console.log('socket connect');
    });
  }

  @SubscribeMessage('newMessage')
  async onNewMessage(@MessageBody() body: any) {
    const input: CreateMessageInput = {
      text: body.text,
      sender: {
        id: body.sender.id,
      },
      recipient: {
        id: body.recipient.id,
      },
      chat: {
        id: body.chat.id,
      },
    };

    this.server.emit('message', body);
    await this.messageService.create(input);
  }
}
