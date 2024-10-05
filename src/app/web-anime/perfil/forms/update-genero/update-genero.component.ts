import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { GeneroService } from '../../../../service/genero.service';

@Component({
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './update-genero.component.html',
  styles: ``
})
export default class UpdateGeneroComponent implements OnInit {

  generoId: any;
  generoData: any = {
    gnombre:''
  };
  errorMessage:string = '';

  constructor(private generoService: GeneroService, 
              private router:Router,
              private route:ActivatedRoute){}
  
  ngOnInit(): void {
    this.generoXId();
  }

  generoXId(){
    this.generoId = this.route.snapshot.paramMap.get('gid');
    const token: any = localStorage.getItem('token')
    if (!token) {
      console.error('Token no encontrado. Redirigiendo al login...');
      // Aquí puedes redirigir al login si lo prefieres
      return;
    }

    if(this.generoId){
      this.generoService.getByIdGenero(this.generoId, token).subscribe(data => {
        this.generoData = data;
      },
      (error) => {
        console.error('Error al obtener el genero:', error);
      });
    } 
  }

  async updateGenero(){
    if (!this.generoData.gnombre ) {
    this.showError('Por favor llene todos los campos');
    return;
    }
    
    // Confirmar acción del usuario
    const confirmRegistration = confirm('¿Estás seguro de que deseas registrar a este anime?');
    if (!confirmRegistration) {
      return;
    }

    try{

      const token: any = localStorage.getItem('token');
      if(!token){
        throw new Error ('token no encontrado')
      }

      const response = await this.generoService.updateGenero(this.generoId, this.generoData, token)
      if(response.gid){
        this.router.navigate(['WebAnime/perfil/tablas/genero-list'])
      }

    }catch(error:any){
      this.showError(error.message)
    }
  }

  showError(mess: string) {
    this.errorMessage = mess;
    setTimeout(() => {
      this.errorMessage = ''
    }, 3000)
  }
}
