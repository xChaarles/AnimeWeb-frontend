import { Component, OnInit } from '@angular/core';
import { GeneroService } from '../../../../service/genero.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../../service/user.service';

@Component({
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './create-genero.component.html',
  styles: ``
})
export default class CreateGeneroComponent implements OnInit {

  genero: any = {
    gnombre: ''
  };

  userprofile: any;
  errorMessage: string = '';

  constructor(private generoService: GeneroService,
              private router: Router){}
  
  ngOnInit(): void {
  }

  async crearGenero(){
    
    if(!this.genero.gnombre){
      this.showError("Por Favor ingrese el nuevo Genero")
    }
    
    const confirmRegistration = confirm('¿Estás seguro de que deseas registrar este Genero?');
    if (!confirmRegistration) {
      return;
    }
    
    try {
      const token: any = localStorage.getItem('token')
      if(!token){
        throw new Error('Token no encontrado')
      }
        const response = await this.generoService.createGenero(this.genero, token)
        if(response.gid){
          this.router.navigate(['WebAnime/perfil/tablas/genero-list'])
        }else {
          this.showError(response.message);
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
