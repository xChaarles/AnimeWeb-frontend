import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AnimeService } from '../../service/anime.service';
import { AnimeRes } from '../../shared/otros/anime-res';

@Component({
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './detailsanime.component.html',
  styles: ``
})
export default class DetailsanimeComponent implements OnInit {

  anime: any = {};

  constructor( private animeService: AnimeService, private router: Router, private route: ActivatedRoute ){}

  ngOnInit(): void {
    const animeId = this.route.snapshot.paramMap.get('aid');
    console.log('AnimeId ',animeId)
    if (animeId) {
      this.animeService.getAnimeById(animeId).subscribe(
        (data) => {
          this.anime = data;  // Asignar los datos del anime a la variable 'anime'
        },
        (error) => {
          console.error('Error al obtener el anime:', error);
        }
      );
    }
  }
}
