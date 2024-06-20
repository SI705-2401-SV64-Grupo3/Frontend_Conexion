import { Conversacion } from "./conversacion"
import { Usuario } from "./usuario"

export class Mensaje {
    id: number = 0

    content: String = ''

    date: Date = new Date(Date.now())

    hour: Date = new Date(Date.now())

    statusMessage: String = ''

    conversation: Conversacion=new Conversacion()

    user: Usuario=new Usuario()
}