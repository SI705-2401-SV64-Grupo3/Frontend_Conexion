import { Usuario } from './usuario';

export class Meta {
  id: number = 0;
  nameGoal: string = "";
  description: string = "";
  estateGoal: string = "";
  user: Usuario = new Usuario();
}
