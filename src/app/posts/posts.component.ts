import { Component, OnInit } from '@angular/core';
import { Post } from '../models/post';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  post1 = {} as Post;
  post?: Post[];
//#region FILTRAR POR TÍTULO
  public titleFiltrado?: Post[];

  private _filtroid: string = '';

  public get filtroid(): string{
    return this._filtroid;
  }

  public set filtroid(value: string) {
    this._filtroid = value;
    this.titleFiltrado = this.filtroid ? this.filtrar(this.filtroid) : this.post;
  }

  filtrar(filtrarPor: string): any{
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.post?.filter(
      (posts: any) => posts.title.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }
  //#endregion FIM DO FILTRO

  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
    this.getPosts();
  }
//#region GET na API
  getPosts(){
    this.postsService.getPosts().subscribe((post1: Post[]) => {
      this.post = post1;
      this.titleFiltrado = post1;
    });
  }
//#endregion FIM DO GET na API
}
