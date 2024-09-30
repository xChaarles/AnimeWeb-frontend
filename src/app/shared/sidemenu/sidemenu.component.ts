import { Component, OnInit } from '@angular/core';
import { Route, Router, RouterModule } from '@angular/router';
import { UserService } from '../../service/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector:'app-sidemenu',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './sidemenu.component.html',
  styles: ``
})
export class SidemenuComponent implements OnInit {

  constructor(private userService: UserService, private router: Router){}

  isAuthenticated:boolean = false;
  isAdmin:boolean = false;
  isUser:boolean = false;

  ngOnInit(): void {
    this.isAuthenticated = this.userService.isAuthenticated();
    this.isAdmin = this.userService.isAdmin();
    this.isUser = this.userService.isUser();
  }
  logout(): void{
    this.userService.logOut();
    this.isAuthenticated = false;
    this.isAdmin = false;
    this.isUser = false;
    this.router.navigate(['WebAnime/animes']).then(() => {
      window.location.reload(); // Recargar la página después de cerrar sesión
    });
  }

  singup(){
    this.router.navigate(['WebAnime/registro'])
  }

}
