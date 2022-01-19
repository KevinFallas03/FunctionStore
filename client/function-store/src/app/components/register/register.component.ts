import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User }  from 'src/app/Models/user';
import { AuthService } from 'src/app/Services/AuthService/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public email: string = '';
  public password: string = '';

  constructor(
    private authService: AuthService,
    private routerService: Router,
    private _snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
    if (this.authService.getIsAuthenticated()) {
        this.routerService.navigateByUrl('/');
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  onRegisterClick(){

    let loginInfo = {
      email: this.email,
      password: this.password
    };

    console.log(loginInfo);

    this.authService.createUser(loginInfo).subscribe(
      (res) => {
        this.authService.authenticateUser(loginInfo).subscribe(
          (res) => {
            console.log(1);
            this.authService.setAuthenticationToken(res.token);
            this.routerService.navigateByUrl('/home');
            this.openSnackBar('Registrado exitosamente', 'Cerrar');
          },
          (error) => {
            this.openSnackBar('Credenciales Inválidas', 'Cerrar');
          }
        );
      },
      (error) => {
        this.openSnackBar('Credenciales Inválidas', 'Cerrar');
      }
    );
  }

  redirectToLogin() {
    this.routerService.navigateByUrl('/login');
  }

}
