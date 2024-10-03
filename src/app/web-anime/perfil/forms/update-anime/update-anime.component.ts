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
  AnimeData: any = {
    anombre: '',
    adescripcion: '',
    aportadaUrl: '',
    fechaEmision: '',
    genero:'',
  };

  errorMessage: string = '';

  userprofile: any;

  isAuthenticated: boolean = false;
  isAdmin: boolean = false;
  isUser: boolean = false;

  constructor(private animeService: AnimeService, 
              private router: Router, 
              private route: ActivatedRoute,
              private userService: UserService){}

  async ngOnInit(): Promise<void> {
    this.getByIdAnime();

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

  //Convertir mi fechaEmision para plasmarla
  convertDateToISOFormat(dateString: string): string {
    const [day, month, year] = dateString.split('/'); // Suponiendo que el formato es DD/MM/YYYY
    return `${day}-${month}-${year}`; // Reemplaza las barras por guiones
    
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
          this.AnimeData = {
            anombre: data.anombre,
            adescripcion: data.adescripcion,
            aportadaUrl: data.aportadaUrl,
            fechaEmision: data.fechaEmision,
            genero: data.genero ? data.genero.gnombre : '' // Asegúrate de que esto sea un string
          };
        },
        (error) => {
          console.error('Error al obtener el anime:', error);
        }
      );
    }
  }

  async updateAnime() {
    // Validar campos requeridos
    if (!this.AnimeData.anombre || !this.AnimeData.adescripcion || 
        !this.AnimeData.aportadaUrl || !this.AnimeData.fechaEmision || 
        !this.AnimeData.genero) {
      this.showError('Por favor llene todos los campos');
      return;
    }
  
    // Confirmar acción del usuario
    const confirmRegistration = confirm('¿Estás seguro de que deseas registrar a este anime?');
    if (!confirmRegistration) {
      return;
    }
  
    try {
      const token: string | null = localStorage.getItem('token');
      if (!token) {
        throw new Error('No se encontró ningún token');
      }
  
      // Verificar rol del usuario
      if (this.userprofile.users?.urole === 'ADMIN') {
        const response = await this.animeService.updateAnime(this.animeId, this.AnimeData, token);
        
        // Navegar si la actualización fue exitosa
        if (response.aid) {
          this.router.navigate(['WebAnime/perfil/tablas/anime-list']);
        }
      } else {
        console.log('El usuario no es ADMIN');
        this.showError('No tienes permisos para realizar esta acción');
      }
    } catch (error: any) {
      this.showError(error.message);
    }
  }
  
  showError(mess: string) {
    this.errorMessage = mess;
    setTimeout(() => {
      this.errorMessage = ''
    }, 3000)
  }
}
