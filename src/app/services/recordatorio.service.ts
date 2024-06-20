import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { Recordatorio } from '../models/recordatorio';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class RecordatorioService {
  private url = `${base_url}/recordatorios`;
  private listaCambio = new Subject<Recordatorio[]>();

  constructor(private http: HttpClient) {}

  list(): Observable<Recordatorio[]> {
    return this.http.get<Recordatorio[]>(this.url);
  }

  insert(g: Recordatorio): Observable<any> {
    return this.http.post(this.url, g);
  }

  setList(listaNueva: Recordatorio[]): void {
    this.listaCambio.next(listaNueva);
  }

  getList(): Observable<Recordatorio[]> {
    return this.listaCambio.asObservable();
  }

  listId(id: number){
    return this.http.get<Recordatorio>(`${this.url}/${id}`);
  }

  update(s: Recordatorio){
    return this.http.put(this.url, s);
  }

  delete(id: number){
    return this.http.delete(`${this.url}/${id}`);
  }
}
