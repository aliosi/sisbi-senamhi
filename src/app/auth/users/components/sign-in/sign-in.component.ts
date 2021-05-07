import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../../core/services/auth/auth.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpErrorResponse} from '@angular/common/http';
import {AuthModel} from '../../../../core/models/auth.model';
import {ToastrService} from 'ngx-toastr';
import swal from 'sweetalert';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  public authForm: FormGroup;
  showPassword = false;
  datos = AuthModel;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    // private sessionService: SessionService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private toastr: ToastrService,
    // private translate: TranslateService
  ) {
    this.authForm = this.fb.group({
      nombreUsuario: [localStorage.getItem('nombreUsuario') || '', [Validators.required, Validators.minLength(4)]],
      password: ['', Validators.required], // passwordStrong
      remember: [false]

    });
  }

  ngOnInit(): void {
  }

  get nombreUsuarioField() {
    return this.authForm.get('nombreUsuario');
  }

  get passwordField() {
    return this.authForm.get('password');
  }

  signIn() {
    this.nombreUsuarioField.setValue(this.nombreUsuarioField.value.toLowerCase());
    this.passwordField.setValue(this.passwordField.value.trim());
    if (this.authForm.invalid) {
      return;
    }
    this.authService.signIn(this.authForm.value)
      .subscribe(
        res => {
          // localStorage
          (this.authForm.get('remember').value) ?
            localStorage.setItem('nombreUsuario', this.authForm.get('nombreUsuario').value) :
            localStorage.removeItem('email');

          (res.token) ?
            // console.log('hola') : this.toastr.error(res.error);
            this.router.navigateByUrl('/admin') : this.toastr.error(res.error);


          // console.log(res.token);
          // this.sessionService.create(res.token);
          //  this.router.navigateByUrl('/admin');
          // if (this.sessionService.user.isAdmin) {
          //   this.router.navigateByUrl('/admin');
          // } else {
          //   this.router.navigateByUrl('/portal');
          // }
        },
        (err: HttpErrorResponse) => {
          const status = String(err.status);
          swal('error', err.error.msg, 'error');
          // this.translate.get(status)
          //   .subscribe((res: string) => {
          //     this._snackBar.open(res, 'Ok' ,  { duration: 2000 });
          //   });
        },
      );
  }

  changeLang(lang: string) {
    console.log(lang);
    // this.translate.use(lang)
    //   .subscribe(res => console.log(res));
  }


}
