import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { Subject } from 'rxjs';
import { Conversacion } from '../models/conversacion';
import { HttpClient } from '@angular/common/http';

const base_url=environment.base


@Injectable({
  providedIn: 'root'
})
export class ConversacionService {

  private url=`${base_url}/conversacion`
  private listaCambio=new Subject<Conversacion[]>()

  constructor(private httpClient:HttpClient) { }

  list(){
    return this.httpClient.get<Conversacion[]>(this.url);
  }
  insert(c:Conversacion){
    return this.httpClient.post(this.url,c);
  }
  setList(listaNueva: Conversacion[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
}
