import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {IUser} from '../../../interfaces/user.interface';
import {IMessage} from '../../../interfaces/message.interface';

@Component({
  selector: 'chat-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessagesComponent {
  @Input() public messageList: IMessage[] = [];
  @Output() public selectUser = new EventEmitter<IUser>();
}
