import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { Subject } from 'rxjs';
import { Notificacion } from '../models/notificacion';
import { HttpClient } from '@angular/common/http';
import { Publicacion } from '../models/publicacion';

const base_url = environment.base
@Injectable({
  providedIn: 'root'
})
export class NotificacionService {
  //aqui va el slash igual que en el controller en el backend
  private url = `${base_url}/notificaciones`
  private listaCambio = new Subject<Notificacion[]>()
  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Notificacion[]>(this.url);
  }
  insert(n: Notificacion) {
    return this.httpClient.post(this.url, n);
  }
  setList(listaNueva: Notificacion[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }

  eliminar(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }

}
