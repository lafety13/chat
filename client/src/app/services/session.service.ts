import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {IUser} from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private session: BehaviorSubject<IUser> = new BehaviorSubject<IUser>(null);

  get(): IUser {
    return this.session.getValue();
  }

  set(user: IUser): void {
    this.session.next(user);
  }

  isAuthenticated(): boolean {
    return Boolean(
      this.get()
    );
  }
}
