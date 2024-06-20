import { Usuario } from "./usuario"

export class Recordatorio {
  id: number = 0
  date: Date = new Date(Date.now())
  hour: number = 0
  asunt: string = ""
  message: string = ""
  stateRecoradatory: string = ""
  user: Usuario = new Usuario()
}
