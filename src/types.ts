export interface UsuarioGithub {
  nome: string
  avatar: string
  perfil: string
}

export interface Autor {
  nome: string
  cargo: string
  avatar: string
}

interface Interacao {
  id: string
  autor: Autor
  texto: string
  /** ISO 8601 */
  criadoEm: string
  aplausos: number
  aplaudido: boolean
}

export type Comentario = Interacao

export interface Post extends Interacao {
  comentarios: Comentario[]
}
