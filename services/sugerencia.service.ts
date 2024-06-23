import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { Observable, Subject } from 'rxjs';
import { Sugerencia } from '../models/sugerencia';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class SugerenciaService {
  private url = `${base_url}/sugerencias`;
  private listaCambio = new Subject<Sugerencia[]>();

  constructor(private http: HttpClient) { }

  list(): Observable<Sugerencia[]> {
    return this.http.get<Sugerencia[]>(this.url);
  }

  insert(g: Sugerencia): Observable<any> {
    return this.http.post(this.url, g);
  }

  setList(listaNueva: Sugerencia[]): void {
    this.listaCambio.next(listaNueva);
  }

  getList(): Observable<Sugerencia[]> {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    return this.http.get<Sugerencia>(`${this.url}/${id}`);
  }

  update(s: Sugerencia) {
    return this.http.put(this.url, s);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
