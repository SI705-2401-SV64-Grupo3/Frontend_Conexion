import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { Recursoeducativo } from '../models/recursoeducativo';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class RecursoeducativoService {
  private url = `${base_url}/recursoseducativos`;
  private listaCambio = new Subject<Recursoeducativo[]>();

  constructor(private http: HttpClient) { }

  list(): Observable<Recursoeducativo[]> {
    return this.http.get<Recursoeducativo[]>(this.url);
  }

  insert(g: Recursoeducativo): Observable<any> {
    return this.http.post(this.url, g);
  }

  setList(listaNueva: Recursoeducativo[]): void {
    this.listaCambio.next(listaNueva);
  }

  getList(): Observable<Recursoeducativo[]> {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    return this.http.get<Recursoeducativo>(`${this.url}/${id}`);
  }

  update(s: Recursoeducativo) {
    return this.http.put(this.url, s);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
