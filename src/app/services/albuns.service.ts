import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Album } from '../models/album';

@Injectable({
  providedIn: 'root'
})
export class AlbunsService {

  url = 'https://jsonplaceholder.typicode.com/albums'

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getAlbuns(): Observable<Album[]>{
    return this.httpClient.get<Album[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }
  
  // Tratamento de erros
   handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      //CLIENTE
      errorMessage = error.error.message;
    } else {
      //SERVIDOR
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };
}
