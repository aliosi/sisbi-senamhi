import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../core/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot) {
    const token = localStorage.getItem('token');
    let val;
    if (token) {
      return true;
    } else {
      this.router.navigate(['./auth']);
      return false;
    }

  }

}
