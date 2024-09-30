import { Component, OnInit } from '@angular/core';
import { Route, Router, RouterModule } from '@angular/router';
import { UserService } from '../../service/user.service';

@Component({
  selector:'app-sidemenu',
  standalone: true,
  imports: [RouterModule],
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
    this.router.navigate(['WebAnime/animes']); 
  }

  singup(){
    this.router.navigate(['WebAnime/registro'])
  }

}
