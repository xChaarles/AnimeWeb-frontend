import { HttpClient } from '@angular/common/http';
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

}
