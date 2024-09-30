import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Router, RouterModule } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './registro.component.html',
  styles: ``
})
export default class RegistroComponent implements OnInit{

  isAdmin: boolean = false; //esto nos permitira validar si un usario es tipo admin o no

  formData: any = {     //Objeto para llenar el formulario y enviarlo a nuestro servicio
    unombre: '',
    uapellido: '',
    uemail: '',
    upassword:'',
    urole:''
  };

  errorMessage: string = '';

  constructor(private userService: UserService,
              private router: Router){}

  ngOnInit(): void {
    this.isAdmin = this.userService.isAdmin();
  }

  async RegistrarUsuario(){
    //Validamos si es usuario o ADMIN
    if(this.isAdmin){
      //comprueba q los datos no esten vacios
      if(!this.formData.unombre || !this.formData.uapellido || !this.formData.uemail || !this.formData.upassword || !this.formData.urole){
        this.showError("Por favor, rellene todos los campos")
      }
      // Confirmar registro con usuario
      const confirmRegistration = confirm('¿Estás seguro de que deseas registrar a este usuario?');
      if (!confirmRegistration) {
        return;
      }
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No se encontró ningún token');
        }
  
        const response = await this.userService.RegistroAdmin(this.formData, token);
        if (response.statusCode === 200) {
          this.router.navigate(['WebAnime/perfil/userlist']);
        } else {
          this.showError(response.message);
        }
      } catch (error: any) {
        this.showError(error.message);
      }
    }else{
        this.formData.urole = "USER"
        this.userService.SingUp(this.formData).pipe(
          tap(dato =>{
            console.log(dato)
            this.router.navigate(['WebAnime/login'])
          }),
          catchError (error => {
            return throwError(() => new Error(error));
          })
        ).subscribe();
    }

    
    
  }

  showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = ''; // Borrar el mensaje de error después del tiempo especificado
    }, 3000);
  }
}
