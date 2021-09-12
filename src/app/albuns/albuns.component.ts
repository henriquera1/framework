import { Component, OnInit } from '@angular/core';
import { Album } from '../models/album';
import { AlbunsService } from '../services/albuns.service';

@Component({
  selector: 'app-albuns',
  templateUrl: './albuns.component.html',
  styleUrls: ['./albuns.component.css']
})
export class AlbunsComponent implements OnInit {

  album1 = {} as Album;
  album?: Album[];

  //#region FILTRAR POR TÍTULO
  public titleFiltrado?: Album[];

  private _filtroid: string = '';

  public get filtroid(): string{
    return this._filtroid;
  }

  public set filtroid(value: string) {
    this._filtroid = value;
    this.titleFiltrado = this.filtroid ? this.filtrar(this.filtroid) : this.album;
  }

  filtrar(filtrarPor: string): any{
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.album?.filter(
      (albuns: any) => albuns.title.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }
//#endregion FIM DO FILTRO

  constructor(private albunsService: AlbunsService) { }

  ngOnInit(): void {
    this.getAlbuns();
  }

  //#region GET na API
  getAlbuns(){
    this.albunsService.getAlbuns().subscribe((album1: Album[]) => {
      this.album = album1;
      this.titleFiltrado = album1;
    });
  }
//#endregion FIM DO GET na API
}

