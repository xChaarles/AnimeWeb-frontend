import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AnimeService {

  private urla = "http://localhost:8080";
  constructor(private ahttp: HttpClient) { }

  //metodo de lista de usuario
  getAnimes(): Observable<any> {
    return this.ahttp.get<any>(`${this.urla}/public/anime`);
  }

  //Metodo para traer un anime por id general
  getAnimeById(animeId: string):Observable<any>{
    const url = `${this.urla}/public/anime/${animeId}`;
    return this.ahttp.get<any>(url);
  }

  getAnimeByidAdmin(animeId: string, token: string):Observable<any>{
    const url = `${this.urla}/public/anime/${animeId}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.ahttp.get<any>(url, {headers})
  }

  async createAnime(AnimeData:any, token: string):Promise<any>{
    const url = `${this.urla}/admin/add-anime`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    try{
      const response = this.ahttp.post<any>(url, AnimeData, {headers}).toPromise()
      return response;
    }catch(error){
      if (error instanceof HttpErrorResponse) {
      if(error.status === 404) {
        console.error('Error: Género no encontrado');
        alert('Error: Género no encontrado. Por favor, verifica el nombre del género.');
      } else {
        console.error('Error al crear el anime:', error);
      }
    } else {
        console.error('Error inesperado:', error);
    }
      throw error;
    }    
  }

  getLisAnime(token:string):Observable<any>{
    const url = `${this.urla}/public/anime`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    try{
      return this.ahttp.get<any>(url, { headers });
    }catch(error){
      throw error;
    }
  }

  async deleteAnime(animeId: string, token:string):Promise<any>{
    const url = `${this.urla}/admin/delete-anime/${animeId}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    try{
      const response = this.ahttp.delete<any>(url, {headers}).toPromise()
      return response;
    }catch(error){
      throw error;
    }
  }

 async updateAnime(animeId: string, AnimeData: any, token: string): Promise<any> {
    const url = `${this.urla}/admin/update-anime/${animeId}`;
    const headers = new HttpHeaders ({
      'Authorization': `Bearer ${token}`
    });
    try{
      const response = this.ahttp.put<any>(url, AnimeData, {headers}).toPromise()
      return response;
    }catch(error){
      if (error instanceof HttpErrorResponse) {
        if(error.status === 404) {
          console.error('Error: Género no encontrado');
          alert('Error: Género no encontrado. Por favor, verifica el nombre del género.');
        } else {
          console.error('Error al crear el anime:', error);
        }
      } else {
          console.error('Error inesperado:', error);
      }
      throw error;
    }
  }
}
