import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/AuthService/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  checkStatus: boolean;

  constructor(
    private authService: AuthService,
    private routerService: Router,
  ) {

  }

  public localStorageItem(): boolean {
    if (localStorage.getItem("authToken") != null) {
      return true
    } else {
      return false;
    };
  }

  ngOnInit(): void {
    this.checkStatus = this.localStorageItem();
  }

  // Logs off a user.
  logOut() {

    if ( localStorage["isLogged"] == "false" ) {
      localStorage.setItem("isLogged", "true");
    }
    const opts = {headers: new HttpHeaders({
      "Authorization": `Bearer ${localStorage.getItem("authToken")}`
    })};

    this.authService.logOut(opts)
    .subscribe(
      _ => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('loggedUser');
        this.routerService.navigate(['/']);
      },
      _ => {console.log("error")}
    );
    this.checkStatus = this.localStorageItem();
  }


}
