import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {SessionService} from '../../services/session.service';

@Injectable({
  providedIn: 'root'
})
export class IsAuthenticatedGuard implements CanActivate {
  constructor(
    private sessionService: SessionService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const authenticated = this.sessionService.isAuthenticated();

    if (!authenticated) {
      this.router.navigateByUrl('auth/sign-in');
    }

    return authenticated;
  }
}
