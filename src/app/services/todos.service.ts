import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Todos } from '../models/todos';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  url = 'https://jsonplaceholder.typicode.com/todos'

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getTodos(): Observable<Todos[]>{
    return this.httpClient.get<Todos[]>(this.url)
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
