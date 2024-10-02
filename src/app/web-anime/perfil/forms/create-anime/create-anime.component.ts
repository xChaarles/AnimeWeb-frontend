import { Component, OnInit } from '@angular/core';
import { AnimeService } from '../../../../service/anime.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../../service/user.service';

@Component({
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './create-anime.component.html',
  styles: ``
})
export default class CreateAnimeComponent implements OnInit {

  formAnime: any = {
    anombre: '',
    adescripcion: '',
    aportadaUrl: '',
    fechaEmision: '',
    genero:'',
  };

  userprofile: any;

  isAuthenticated: boolean = false;
  isAdmin: boolean = false;
  isUser: boolean = false;

  errorMessage: string = '';

  constructor(private animeService: AnimeService,
              private readonly router: Router,
              private userService:UserService){}

  async ngOnInit():Promise<void> {
    this.isAuthenticated = this.userService.isAuthenticated();
    this.isAdmin = this.userService.isAdmin();
    this.isUser = this.userService.isUser();

    try {
      const token = localStorage.getItem('token')
      if(!token){
        throw new Error("No Token Found")
      }
      this.userprofile = await this.userService.getYourProfile(token);
    } catch (error:any) {
      this.showError(error.message)
    }
    console.log(this.userprofile)
  }

  async crerAnime(){

    if(!this.formAnime.anombre || !this.formAnime.adescripcion || !this.formAnime.aportadaUrl || !this.formAnime.fechaEmision || !this.formAnime.genero){
      this.showError('Por favor llene todos los campos')
      return
    }
    const confirmRegistration = confirm('¿Estás seguro de que deseas registrar a este anime?');
    if (!confirmRegistration) {
      return;
    }
    try{
      const token: any = localStorage.getItem('token');
      if (!token) {
        throw new Error('No se encontró ningún token');
      }
      if(this.userprofile.users?.urole == 'ADMIN'){
      const response = await this.animeService.createAnime(this.formAnime, token)
      if(response.aid){
        this.router.navigate(['WebAnime/perfil/tablas/anime-list'])
      }else {
        this.showError(response.message);
      }
    }else{
      console.log('el usuario no es ADMIN')
    }
    }catch(error:any){
      this.showError(error.message)
    }
  }

  showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = ''; // Borrar el mensaje de error después del tiempo especificado
    }, 3000);
  }

}
