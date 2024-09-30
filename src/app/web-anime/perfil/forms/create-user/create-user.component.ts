import { Component, OnInit } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { UserService } from '../../../../service/user.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Token } from '@angular/compiler';

@Component({
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './create-user.component.html',
  styles: ``
})
export default class CreateUserComponent implements OnInit {

  isAdmin: boolean = false; //esto nos permitira validar si un usario es tipo admin o no
  selectedOption: string = '';//variable para el selector

  formData: any = {     //Objeto para llenar el formulario y enviarlo a nuestro servicio
    unombre: '',
    uapellido: '',
    uemail: '',
    upassword:'',
    urole:''
  };

  errorMessage: string = '';

  constructor(private readonly userService: UserService,
              private readonly router: Router){}

  ngOnInit(): void {
    this.isAdmin = this.userService.isAdmin();
  }

  async RegistrarUsuario(){
      //comprueba q los datos no esten vacios
      if(!this.formData.unombre || !this.formData.uapellido || !this.formData.uemail || !this.formData.upassword){
        this.showError("Por favor, rellene todos los campos")
        return;
      }

      if(this.selectedOption != "" ){
        this.formData.urole = this.selectedOption
      }else{
        this.showError("Por favor seleccione un Rol")
        return;
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
  
        const response = await this.userService.register(this.formData, token);
        console.log(response)
        if (response.statusCode === 200) {
          this.router.navigate(['WebAnime/perfil/forms/tablas/userlist']).then(() => {
            window.location.reload();
          });
        } else {
          this.showError(response.message);
        }
      } catch (error: any) {
        this.showError(error.message);
      }
  }
  
  showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = ''; // Borrar el mensaje de error después del tiempo especificado
    }, 3000);
  }

}
