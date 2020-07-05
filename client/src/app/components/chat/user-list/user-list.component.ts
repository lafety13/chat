import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {IUser} from '../../../interfaces/user.interface';

@Component({
  selector: 'chat-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent {
  @Input() public userList: IUser[] = [];
  @Input() public socketId: string;
  @Output() public selectUser = new EventEmitter<IUser>();

  public onClickUser(user: IUser): void {
    if (this.socketId !== user.socketId) {
      this.selectUser.emit(user);
    }
  }
}
