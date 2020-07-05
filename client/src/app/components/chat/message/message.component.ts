import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {IUser} from '../../../interfaces/user.interface';
import {IMessage} from '../../../interfaces/message.interface';

@Component({
  selector: 'chat-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageComponent {
  @Input() public message: IMessage;
  @Output() public selectUser = new EventEmitter<IUser>();

  public highlighted: boolean;
}
