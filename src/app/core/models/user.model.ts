export class UserModel {
  constructor(
    public nombreUsuario: string,
    public user: string,
    public password?: string,
    public sistema?: string,
    public id?: number,
    public nombre?: string,
    public tel?: string,
    public roles?: [],
  ) {
  }
}
