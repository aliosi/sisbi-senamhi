import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {routes_back} from '../../../common/util/constants';
import {Observable} from 'rxjs';
import {routes} from '../../../app-routing.module';
import {AuthModel} from '../../models/auth.model';
import {tap} from 'rxjs/operators';
import {UserModel} from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: UserModel;

  constructor(
    private http: HttpClient
  ) {

  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('nombre');
    localStorage.removeItem('roles');
    localStorage.removeItem('usuario');
  }

  CheckToken() {
    const token = localStorage.getItem('token') || '';
    return this.http.get(`${routes_back.SISBI_AUTH_SERVICE_API}/renew`, {
      headers: {
        'x-token': token
      }
    });
  }

  signIn(credentials: { nombreUsuario: string, password: string }): Observable<AuthModel> {
    return this.http.post<AuthModel>(routes_back.SISBI_AUTH_SERVICE_API, credentials)
      .pipe(
        tap((resp: any) => {
          const {nombreUsuario, sistema, id, nombre, tel, roles, user} = resp;
          this.user = new UserModel(nombreUsuario, user, '', sistema, id, nombre, tel, roles);
          // console.log(resp);
          localStorage.setItem('token', resp.token);
          localStorage.setItem('nombre', resp.nombre);
          //21,Administrador
          // 22,Patrimonio
          // 23,Zonal
          localStorage.setItem('roles', resp.roles);
          localStorage.setItem('usuario', resp.user);
          // localStorage.setItem('sesion',resp);

        })
      );
  }


}
