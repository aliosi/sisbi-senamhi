import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolGuard implements CanActivate {
  constructor(
    private router: Router,
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    let rol = localStorage.getItem('roles');
    if (rol === '22' || rol=='21') {
      return true;
    } else {

      this.router.navigate(['./admin/bienes/internos']);
      return false;
    }
    // console.log('Entra al guard rolS');
    // console.log(rol);

  }

}
