import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { GeneroService } from '../../../../service/genero.service';

@Component({
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './genero-list.component.html',
  styles: ``
})
export default class GeneroListComponent implements OnInit {

  generolist: any [] = [];
  errorMessage: string = '';

  constructor(private generoService: GeneroService,
              private router: Router){}

  ngOnInit(): void {
    this.ListGenero();
  }

  ListGenero(){
    const token: any = localStorage.getItem('token');
    this.generoService.getListGenero(token).subscribe(data =>{
      this.generolist = data
    });
  }

  async deleteGenero(generoId: string){
    const confirmDelete = confirm("Estas seguro de Eliminar este genero?")
    if(confirmDelete){
      try{
        const token: any = localStorage.getItem('token');
        await this.generoService.deleteGenero(generoId, token)
        this.ListGenero();
      }catch(error:any){
        this.showError(error.message)
      }
    }
  }

  showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = ''; // Borrar el mensaje de error después del tiempo especificado
    }, 3000);
  }
}
