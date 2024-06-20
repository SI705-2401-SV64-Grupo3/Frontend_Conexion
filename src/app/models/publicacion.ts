import { Usuario } from "./usuario"

export class Publicacion {
    id: number = 0
    content: string = ''
    date: Date = new Date(Date.now())
    hour: string = ''
    likes: number = 0
    shared: number = 0
    user: Usuario = new Usuario()
}