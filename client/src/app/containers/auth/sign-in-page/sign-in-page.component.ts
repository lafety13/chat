import {Component} from '@angular/core';
import {SessionService} from '../../../services/session.service';
import {Router} from '@angular/router';

@Component({
  templateUrl: './sign-in-page.component.html'
})
export class ChatSignInPageComponent {
  constructor(
    private sessionService: SessionService,
    private router: Router
  ) { }

  public onSubmit({ username }) {
    this.sessionService.set({ username });
    this.router.navigateByUrl('chat');
  }
}
