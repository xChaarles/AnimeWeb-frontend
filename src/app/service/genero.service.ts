import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneroService {

  private urlg = "http://localhost:8080";
  constructor(private ghttp: HttpClient) { }

  //Lista de generos
  getGeneros(): Observable<any> {
    return this.ghttp.get<any>(`${this.urlg}/public/generos`)
  }

  async createGenero(generoData: any, token:string):Promise<any>{
    const url = `${this.urlg}/admin/add-genero`
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    try{
      const response = await this.ghttp.post<any>(url,generoData, {headers}).toPromise();
      return response;
    }catch(error){
      throw error;
    }
  }

  getListGenero(token:string):Observable<any>{
    const url = `${this.urlg}/public/generos`
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    try{
      return this.ghttp.get<any>(url, {headers})
    }catch(erro){
      throw erro;
    }
  }

  async deleteGenero(generoId:string, token:string):Promise<any>{
    const url = `${this.urlg}/admin/delete-genero/${generoId}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    try{
      const response = await this.ghttp.delete<any>(url, {headers}).toPromise();
      return response;
    }catch(error){
      throw error;
    }
  }

  async updateGenero(generoId:string, generoData:any, token:string):Promise<any>{
    const url = `${this.urlg}/admin/update-genero/${generoId}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    try{
      const response = this.ghttp.put<any>(url,generoData, {headers}).toPromise()
      return response;
    }catch(error){
      throw error;
    }
  }

  getByIdGenero(generoId:string, token:string):Observable<any>{
    const url = `${this.urlg}/public/generos/${generoId}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.ghttp.get<any>(url, {headers})
  }

}
