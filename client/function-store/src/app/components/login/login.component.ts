import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User }  from 'src/app/Models/user';
import { AuthService } from 'src/app/Services/AuthService/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //Atributos
  public user: User;
  public email: string = '';
  public password: string = '';

  constructor(
      private authService: AuthService,
      private routerService: Router,
      private _snackBar: MatSnackBar) {
        this.user = {};
  }

  ngOnInit(): void {
    if (this.authService.getIsAuthenticated()) {
        this.routerService.navigateByUrl('/home');
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  onLoginClick(){

    let loginInfo = {
      email: this.email,
      password: this.password
    };

    console.log(loginInfo);

    this.authService.authenticateUser(loginInfo).subscribe(
      (res) => {
        this.user = {_id: res.userFound._id, email: res.userFound.email};
        localStorage.setItem("user_id", this.user._id);
        this.authService.setAuthenticationToken(res.token);
        this.routerService.navigateByUrl('/');
        this.openSnackBar('Autenticado exitosamente','Cerrar');
      },
      (error) => {
        this.openSnackBar('Credenciales Inválidas','Cerrar');
      }
    );

  }

  redirectToRegister() {
    this.routerService.navigateByUrl('/register');
  }

}
