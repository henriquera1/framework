import { Component, OnInit } from '@angular/core';
import { Todos } from '../models/todos';
import { TodosService } from '../services/todos.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  todos1 = {} as Todos;
  todos?: Todos[];

  //#region FILTRAR POR TÍTULO
  public titleFiltrado?: Todos[];

  private _filtroid: string = '';

  public get filtroid(): string{
    return this._filtroid;
  }

  public set filtroid(value: string) {
    this._filtroid = value;
    this.titleFiltrado = this.filtroid ? this.filtrar(this.filtroid) : this.todos;
  }

  filtrar(filtrarPor: string): any{
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.todos?.filter(
      (todo: any) => todo.title.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }
//#endregion FIM DO FILTRO

  constructor(private todosService: TodosService) { }

  ngOnInit(): void {
  this.getTodos();
  }

   //#region GET na API
  getTodos(){
    this.todosService.getTodos().subscribe((todos1: Todos[]) => {
      this.todos = todos1;
      this.titleFiltrado = todos1
    });
  }
//#endregion FIM DO GET na API

}
