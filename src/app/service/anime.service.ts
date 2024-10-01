import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AnimeRes } from '../shared/otros/anime-res'

@Injectable({
  providedIn: 'root'
})
export class AnimeService {

  private urla = "http://localhost:8080";
  constructor(private ahttp: HttpClient) { }

  async getAllAnime(): Promise<any>{
    const url = `${this.urla}/public/anime`;
    try{
      const response = this.ahttp.get<any>(url).toPromise()
      return response;
    }catch(error){
      throw error;
    }
  }

  getAnimes(): Observable<any> {
    return this.ahttp.get<any>(`${this.urla}/public/anime`);
  }
}
