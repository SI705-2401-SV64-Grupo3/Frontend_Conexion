
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { Subject } from 'rxjs';
import { Usuario } from '../models/usuario';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private url = `${base_url}/usuarios`
  private listacambio = new Subject<Usuario[]>()

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Usuario[]>(this.url);
  }
  insert(u: Usuario) {
    return this.httpClient.post(this.url, u);
  }
  setList(listaNueva: Usuario[]) {
    this.listacambio.next(listaNueva);
  }
  getList() {
    return this.listacambio.asObservable();
  }
  listId(id: number) {
    return this.httpClient.get<Usuario>(`${this.url}/${id}`);
  }
  update(us: Usuario) {
    return this.httpClient.put(this.url, us);
  }
  eliminar(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }
}
