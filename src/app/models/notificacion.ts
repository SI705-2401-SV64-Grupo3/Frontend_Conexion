import { Publicacion } from "./publicacion"

export class Notificacion {
    id: number = 0
    content: string = ''
    date: Date = new Date(Date.now())
    publication: Publicacion = new Publicacion()
}