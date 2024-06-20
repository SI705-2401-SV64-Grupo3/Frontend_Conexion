import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Publicacion } from '../models/publicacion';
import { Subject } from 'rxjs';

const base_url = environment.base

@Injectable({
  providedIn: 'root'
})
export class PublicacionService {
  private url = `${base_url}/publicacion`

  private listaCambio = new Subject<Publicacion[]>()

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Publicacion[]>(this.url)
  }
  insert(p: Publicacion) {
    return this.http.post(this.url, p);
  }

  setList(listaNueva: Publicacion[]) {

    this.listaCambio.next(listaNueva);
  }
  getList() {

    return this.listaCambio.asObservable();
  }
  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
