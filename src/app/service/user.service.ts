import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private api = "http://localhost:8080"
  constructor(private http : HttpClient) {}

  //Metodo para loguearse
  async login(uemail:string, upassword:string):Promise<any>{
    const url = `${this.api}/auth/login`; //url es la ruta que esta en nuestro backend para el login
    try{
      const response = this.http.post<any>(url, {uemail, upassword}).toPromise() //Esto envia el usuario y la contraseña a nuestro backend
      return response;                                                         //si es son correctas procede a entrar al tipo de usuario
    }catch(error){
      throw error;                                                             //si no devolvera que es incorrecta
    }
  }

  //Registro de Usuarios desde ADMIN //url es la ruta del backend para el registro tipo admin //aqui le pasamos el headers la autorizacion y el token de que el usuario es de tipo //ADMIN//Donde response se convierte en el nuevo usuario a almacenar//con la url, los datos y el token de autorizacion y retorna un nuevo usuario
  async register(UserData:any, token:string):Promise<any>{
    const url = `${this.api}/auth/register`;
    const headers = new HttpHeaders({     
      'Authorization': `Bearer ${token}`
    })
    try{
      const response = this.http.post<any>(url, UserData, {headers}).toPromise()
      return response;
    }catch(error){
      throw error;
    }
  }
  
  //Registro del usuario
  SingUp(UserData:any):Observable<Object>{
    return this.http.post<any>(`${this.api}/auth/register`, UserData)
  }

  async getYourProfile(token:string):Promise<any>{
    const url = `${this.api}/adminuser/get-profile`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    try{
      const response =  this.http.get<any>(url, {headers}).toPromise()
      return response;
    }catch(error){
      throw error;
    }
  }

  //Metodo para traer usuario por Id
  async getUsersById(userId: string, token:string):Promise<any>{
    const url = `${this.api}/admin/get-users/${userId}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    try{
      const response = this.http.get<any>(url, {headers}).toPromise()
      return response;
    }catch(error){
      throw error;
    }
  }

  //Metodo para actualizar un usuario
  async updateUser(userId: string,userData:any, token:string):Promise<any>{
    const url = `${this.api}/admin/update/${userId}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    try{
      const response = this.http.put<any>(url, userData, {headers}).toPromise()
      return response;
    }catch(error){
      throw error;
    }
  }

  //METODOS DE AUTENTICACION

  //Este metodo nos permite que al realizar un cerrado de sesion las credianciales del usuario logeadio sean removidas
  logOut(): void{
    if(typeof localStorage !== 'undefined'){
      localStorage.removeItem('token')
      localStorage.removeItem('role')
    }
  }

  isAuthenticated(): boolean{
    if(typeof localStorage !== 'undefined'){
      const token = localStorage.getItem('token');
      return !!token;
    }
    return false;
  }

  isAdmin(): boolean{
    if(typeof localStorage !== 'undefined'){
      const role = localStorage.getItem('role');
      return role == "ADMIN";
    }
    return false;
  }

  isUser(): boolean{
    if(typeof localStorage !== 'undefined'){
      const role = localStorage.getItem('role');
      return role == "USER";
    }
    return false;
  }
}
