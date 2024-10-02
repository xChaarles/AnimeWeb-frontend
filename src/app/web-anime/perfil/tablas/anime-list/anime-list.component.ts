import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AnimeService } from '../../../../service/anime.service';

@Component({
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './anime-list.component.html',
  styles: ``
})
export default class AnimeListComponent {
 
  anime: any[] = [];
  errorMessage: string = "";

  constructor (private animeService: AnimeService, private router: Router){}
  
  ngOnInit(): void {
    this.listAnime();
  }

  async listAnime() {
      const token: any = localStorage.getItem('token');
      this.animeService.getLisAnime(token).subscribe(
        (response) => {
            if (response && response.length > 0) {
                this.anime = response; // Asegúrate de que estás asignando correctamente
            } else {
                this.showError('No animes found.');
            }
        },
        (error) => {
            this.showError('Error fetching anime: ' + error.message);
        }
    );
  }

  async deleteAnime(animeId: string){
    const confirmDelete = confirm("Estas seguro de Eliminar este Usuario?")
    if(confirmDelete){
      try{
        const token: any = localStorage.getItem('token');
        await this.animeService.deleteAnime(animeId, token)
        this.listAnime();
      }catch(error: any){
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
