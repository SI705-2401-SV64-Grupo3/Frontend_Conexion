import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { Subject } from 'rxjs';
import { Comentario } from '../models/comentario';
import { HttpClient } from '@angular/common/http';
import { Publicacion } from '../models/publicacion';

const base_url = environment.base
@Injectable({
  providedIn: 'root'
})
export class ComentarioService {
  //aqui va el slash igual que en el controller en el backend
  private url = `${base_url}/comentarios`
  private listaCambio = new Subject<Comentario[]>()
  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Comentario[]>(this.url);
  }
  insert(c: Comentario) {
    return this.httpClient.post(this.url, c);
  }
  setList(listaNueva: Comentario[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }

  eliminar(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }

}
