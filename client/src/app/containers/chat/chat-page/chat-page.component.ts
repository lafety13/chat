import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChatService} from '../../../services/chat.service';
import {Observable} from 'rxjs';
import {IMessage} from '../../../interfaces/message.interface';
import {SessionService} from '../../../services/session.service';
import {IUser} from '../../../interfaces/user.interface';
import {tap} from 'rxjs/operators';
import {ChatWsEventsEnum} from '../../../constants/chat-ws-events.enum';

@Component({
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent implements OnInit, OnDestroy {
  public messages: IMessage[];
  public users: Observable<IUser[]>;
  public socketId: Observable<string>;
  public linkedUsername: string;

  constructor(
    private chatService: ChatService,
    private sessionService: SessionService
  ) {}

  public ngOnInit() {
    this.chatService.connect();
    this.chatService.emit(ChatWsEventsEnum.ReceiveHistory);

    const user = this.sessionService.get();
    this.chatService.emit(ChatWsEventsEnum.UserConnected, user);
    this.users = this.chatService.on(ChatWsEventsEnum.UserConnected);
    this.socketId = this.chatService.socketId;

    this.chatService
      .on(ChatWsEventsEnum.History)
      .pipe(tap((history) => this.messages = history))
      .subscribe();

    this.chatService
      .on(ChatWsEventsEnum.Message)
      .pipe(tap((message) => this.messages = [...this.messages, message]))
      .subscribe();
  }

  public ngOnDestroy(): void {
    this.chatService.disconnect();
  }

  public onSendMessage(msg) {
    const user = this.sessionService.get();
    this.chatService.emit(
      ChatWsEventsEnum.Message,
      {
        message: msg.message,
        username: user.username
      });
  }

  public onUserDblClick(user: IUser) {
    this.linkedUsername = `@${user.username} `;
  }
}
