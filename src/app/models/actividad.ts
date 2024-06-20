import { Usuario } from "./usuario"

export class Actividad {
    id: number = 0

    date: Date = new Date(Date.now())

    durationActivity: Date = new Date(Date.now())

    nameActivity: String = ''
    
    placeActivity: String = ''

    description: String = ''

    user1: Usuario=new Usuario()

    user2: Usuario=new Usuario()
}