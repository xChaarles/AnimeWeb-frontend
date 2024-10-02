import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLinkActive, RouterModule } from '@angular/router';
import { AnimeService } from '../../../../service/anime.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../../service/user.service';

@Component({
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './update-anime.component.html',
  styles: ``
})
export default class UpdateAnimeComponent implements OnInit {

  animeId: any;
  AnimeData: any = {};

  errorMessage: string = '';

  constructor(private animeService: AnimeService, 
              private router: Router, 
              private route: ActivatedRoute,
              private userService: UserService){}

  async ngOnInit(): Promise<void> {
    this.getByIdAnime();
  }

  //Convertir mi fechaEmision para plasmarla
  convertDateToISOFormat(dateString: string): string {
    return dateString.replace(/\//g, '-'); // Reemplaza las barras por guiones
  }

  //Obtenemos los datos de anime por el ID
  getByIdAnime(){
    this.animeId = this.route.snapshot.paramMap.get('aid');
    const token = localStorage.getItem('token')
    if (!token) {
      console.error('Token no encontrado. Redirigiendo al login...');
      // Aquí puedes redirigir al login si lo prefieres
      return;
    }

    if(this.animeId){
      this.animeService.getAnimeByidAdmin(this.animeId, token).subscribe(
        data => {
          data.fechaEmision = this.convertDateToISOFormat(data.fechaEmision);
          this.AnimeData = data;
        },
        (error) => {
          console.error('Error al obtener el anime:', error);
        }
      );
    }
  }

  updateAnime() {
    const confirmUpdate = confirm("¿Deseas actualizar este anime?");
    if (!confirmUpdate) return;
  
    const token: any = localStorage.getItem('token');
    if (!token) {
      alert('Token not found');
      return; // Salir si no hay token
    }
    console.log(token)
    console.log(this.animeId)
    this.animeService.updateAnime(this.animeId, this.AnimeData, token).subscribe(
      (res) => {
        // Validar el statusCode
        if (res.statusCode === 200) {
          this.router.navigate(['WebAnime/perfil/tablas/anime-list']);
        } else {
          // Manejar otros códigos de estado
          alert(res.message || 'Error al actualizar el anime'); // Muestra un mensaje específico
        }
      },
      (error) => {
        // Manejar errores de la petición HTTP
        console.error('Error al actualizar el anime:', error);
        alert('Ocurrió un error al intentar actualizar el anime.'); // Mostrar mensaje de error genérico
      }
    );
  } 

  showError(mess: string) {
    this.errorMessage = mess;
    setTimeout(() => {
      this.errorMessage = ''
    }, 3000)
  }
}
