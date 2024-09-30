import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../../service/user.service';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './info.component.html',
  styles: ``
})
export default class InfoComponent implements OnInit {
  isAuthenticated:boolean = false;
  isAdmin:boolean = false;
  isUser:boolean = false;

  profileInfo: any;
  errorMessage: string = '';

  constructor(private userService:UserService, 
              private router: Router){}

  async ngOnInit():Promise<void> {
    this.isAuthenticated = this.userService.isAuthenticated();
    this.isAdmin = this.userService.isAdmin();
    this.isUser = this.userService.isUser();

    try {
      const token = localStorage.getItem('token')
      if(!token){
        throw new Error("No Token Found")
      }
      this.profileInfo = await this.userService.getYourProfile(token);
    } catch (error:any) {
      this.showError(error.message)
    }
  }

  updatePerfil(uid : number){
    this.isAdmin = this.userService.isAdmin();
    this.router.navigate(['/WebAnime/perfil/forms/update-user', uid])
  }

  showError(mess: string) {
    this.errorMessage = mess;
    setTimeout(() => {
      this.errorMessage = ''
    }, 3000)
  }
}
