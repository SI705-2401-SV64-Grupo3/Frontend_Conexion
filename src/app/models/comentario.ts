import { Publicacion } from "./publicacion"

export class Comentario {
    id: number = 0
    content: string = ''
    date: Date = new Date(Date.now())
    hour: string = ''
    publication: Publicacion = new Publicacion()
}