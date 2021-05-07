import {Component} from '@angular/core';

import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {AuthService} from '../../../core/services/auth/auth.service';
import {UserModel} from '../../../core/models/user.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  public nombre;
  public rol;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
  ) {
    // console.log('entra a header');
    this.nombre = localStorage.getItem('nombre');
    this.rol = localStorage.getItem('roles');
    console.log(this.rol);
    // console.log(this.user.nombre);
  }

  logout() {
    this.authService.logout();
  }
}
