import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../service/user.service';

@Component({
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styles: ``
})
export default class LoginComponent {

  constructor(private readonly userService: UserService,
              private router: Router){}

  uemail: string = ''
  upassword: string = ''
  errorMessage: string = ''

  async loginSubmit(){
    //Validamos que los campos no esten vacios
    if (!this.uemail || !this.upassword) { //Validamos si el email o la contraseña no tengan campos vacios
      this.showError("El Email y la Contraseña son requeridos"); // si alguno no cumple mostrara este error
      return
    }
    //luego de valiamos en el servico el login del usuario
    try {
      const response = await this.userService.login(this.uemail, this.upassword);
      if(response.statusCode == 200){ //valida si el usuari y la contraseña existen en el servicio
        localStorage.setItem('token', response.token) //almacena el token en el localstorage de la pagina
        localStorage.setItem('role', response.role)   //almacena el tipo de rol si es usuario o admin
        this.router.navigate(['/WebAnime/perfil/info']).then(() => {
          window.location.reload();
        }); // y lo redirige al perfil de este usario
      }else{
        this.showError(response.message) //esto es un mensaje de error si la contraseña sea incorrecta 
      }
    } catch (error: any) {
      this.showError(error.message) // Este es si el usuario no existe
    }
  }

  showError(mess: string) {
    this.errorMessage = mess;
    setTimeout(() => {
      this.errorMessage = ''
    }, 3000)
  }
}
