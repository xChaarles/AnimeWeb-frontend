import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../service/user.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './userlist.component.html',
  styles: ``
})
export default class UserlistComponent implements OnInit{

  user: any[] = []; //Creamos un constructor para mapear los usuarios
  errorMessage: string = "";

  constructor(private userService:UserService, 
              private router: Router){}

  ngOnInit(): void {
    this.TraerUsers();
  }

  async TraerUsers(){
    try{
      const token: any = localStorage.getItem('token');
      const response = await this.userService.getAllUsers(token);
      if (response && response.statusCode === 200 && response.usersList) {
        this.user = response.usersList;
      } else{
        this.showError('No users found.');
      }
    }catch(error: any){
      this.showError(error.message)
    }
  }

  async deleteUsuarios(userId: string){
    const confirmDelete = confirm("Estas seguro de Eliminar este Usuario?")
    if(confirmDelete){
      try{
        const token: any = localStorage.getItem('token');
        await this.userService.deleteUser(userId, token)
        this.TraerUsers();
      }catch(error:any){
        this.showError(error.message)
      }
    }
  }

  showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = ''; // Clear the error message after the specified duration
    }, 3000);
  }

}
