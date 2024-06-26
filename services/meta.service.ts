import { Meta } from './../models/meta';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { goalsSuccededDTO } from '../models/goalsSuccededDTO';

const base_url=environment.base

@Injectable({
  providedIn: 'root'
})
export class MetaService {
  private url=`${base_url}/metas`
  private listaCambio=new Subject<Meta[]>()

  constructor(private httpClient:HttpClient) { }

  list(){
    return this.httpClient.get<Meta[]>(this.url);
  }
  insert(p:Meta){
    return this.httpClient.post(this.url,p);
  }
  setList(listaNueva: Meta[]) {
    this.listaCambio.next(listaNueva);
  }
  getList(): Observable <Meta[]> {
    return this.listaCambio.asObservable();
  }

  goalsSucceded(id:number): Observable<goalsSuccededDTO[]> {
    return this.httpClient.get<goalsSuccededDTO[]>(`${this.url}/metasLogradas?id=${id}`);
  }
}
