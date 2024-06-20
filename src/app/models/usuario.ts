export class Usuario {

  id: number = 0
  idFather: number = 0
  username: string = ""
  password: string = ""
  enabled: boolean = true
  name: string = ""
  lastName: string = ""
  mail: string = ""
  birthDate: Date = new Date(Date.now())
  genre: string = ""
  description: string = ""
  preference: string = ""
}
