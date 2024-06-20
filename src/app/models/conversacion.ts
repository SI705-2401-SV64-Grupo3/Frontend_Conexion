import { Usuario } from './usuario';

export class Conversacion {
  id: number = 0;
  startDate: Date = new Date(Date.now());
  user1: Usuario = new Usuario();
  user2: Usuario = new Usuario();
}
