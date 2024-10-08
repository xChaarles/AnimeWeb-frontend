import { Component, OnInit } from '@angular/core';
import { GeneroService } from '../../service/genero.service';
import { Router, RouterModule } from '@angular/router';
import { AnimeService } from '../../service/anime.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './genero.component.html',
  styles: ``
})
export default class GeneroComponent implements OnInit {

  formGenero: any [] = [];
  anime: any = {
      anombre: '',
      adescripcion: '',
      aportadaUrl: '',
      fechaEmision: '',
      genero:'',
    };

  animesFiltrados: any[] = [];
  selectedGenre: string | null = null;

  constructor(private generoService: GeneroService,
              private router: Router,
              private animeService: AnimeService){}

  ngOnInit(): void {
    this.ListGenero();
    this.listAnime();
  }

  ListGenero(){
    this.generoService.getGeneros().subscribe(data => {
      this.formGenero = data
    })
  }

  async listAnime() {
    this.animeService.getAnimes().subscribe( data => {
      this.anime = data;
      this.animesFiltrados = this.anime
      });
  }

  detelleAnime(animeId : string){
    this.router.navigate(['/WebAnime/detailanime', animeId]).then (() => {
      window.location.reload()
    });
  }

  filtrarAnimesPorGenero(generoNombre: string): void {
    this.animeService.getAnimesByGenero(generoNombre).subscribe(data => {
      this.animesFiltrados = data;
    });
  }

  seleccionarGenero(gnombre: string): void {
    this.selectedGenre = gnombre;
    this.filtrarAnimesPorGenero(gnombre); // También filtra por género seleccionado
  }
}
