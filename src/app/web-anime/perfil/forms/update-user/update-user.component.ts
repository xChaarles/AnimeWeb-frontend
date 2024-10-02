import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../service/user.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { window } from 'rxjs';

@Component({
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './update-user.component.html',
  styles: ``
})
export default class UpdateUserComponent implements OnInit {

  userId: any;
  userData: any = {};
  errorMessage: string = '';

  constructor(private userService:UserService,
              private router:Router,
              private route:ActivatedRoute){}
  
  ngOnInit(): void {
    this.getUserById();
  }

  //vamos a obtener el usuariio por el Id
  async getUserById(){
    this.userId = this.route.snapshot.paramMap.get('uid')
    const token = localStorage.getItem('token')
    if(!this.userId || !token){
      this.showError("el Usuario o Token son requeridos")
      return;
    }

    try{
      let userDataResponse = await this.userService.getUsersById(this.userId, token)
      const {unombre, uapellido, uemail, urole} = userDataResponse.users
      this.userData = {unombre, uapellido, uemail, urole};
    }catch(error:any){
      this.showError(error.message)
    }
  }

  async updateUser(){
    const confirmUpdate = confirm("Deseas Actualizar este usuario");
    if(!confirmUpdate) return
    try{
      const token = localStorage.getItem('token')
      if(!token){
        throw new Error('Token not found')
      }
      const res = await this.userService.updateUser(this.userId, this.userData, token);
      if(res.statusCode == 200){
        this.router.navigate(['WebAnime/perfil/tablas/userlist'])
      }
    }catch(error: any){
      this.showError(error.message)
    }

  }

  showError(mess: string) {
    this.errorMessage = mess;
    setTimeout(() => {
      this.errorMessage = ''
    }, 3000)
  }
}
