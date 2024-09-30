import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './perfil.component.html',
  styles: ``
})
export default class PerfilComponent implements OnInit {
  menuOpen: boolean = false; // Estado del menú
  isAuthenticated:boolean = false;
  isAdmin:boolean = false;
  isUser:boolean = false;

  profileInfo: any;

  constructor(private userService:UserService, 
              private router: Router){}

  async ngOnInit():Promise<void> {
    this.isAuthenticated = this.userService.isAuthenticated();
    this.isAdmin = this.userService.isAdmin();
    this.isUser = this.userService.isUser();

  }

  // Método para alternar la visibilidad del menú
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
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
}
