import { Component, OnInit } from '@angular/core';
import { AnimeService } from '../../service/anime.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './animes.component.html',
  styles: ``
})
export default class AnimesComponent implements OnInit {

  anime: any[] = [];

  errorMessage: string = '';

  constructor (private animeService: AnimeService, private router: Router){}
  
  ngOnInit(): void {
    this.listAnime();
  }

  async listAnime() {
    this.animeService.getAnimes().subscribe( data => {
      this.anime = data;
      });
  }

  showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = ''; // Borrar el mensaje de error después del tiempo especificado
    }, 3000);
  }

}
