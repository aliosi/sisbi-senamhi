export class TokenInterface {
  user: string;
  userId: string;
  userRol: UserRol;
}

export enum UserRol {
  ADMIN = 'ADMIN',
  STUDENT = 'STUDENT'
}

export class UserModel {
  id: string;
  rol: UserRol;
  user: string;

  constructor(data: TokenInterface) {
    this.id = data.userId || null;
    this.rol = data.userRol || null;
    this.user = data.user || null;
  }

  get isAdmin(): boolean {
    return this.rol === UserRol.ADMIN;
  }

  get isStudent(): boolean {
    return this.rol === UserRol.STUDENT;
  }

  isAuthorized(rols: UserRol[]) {
    return rols.includes(this.rol);
  }

}
