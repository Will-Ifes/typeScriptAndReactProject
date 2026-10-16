import { GithubLogo } from '@phosphor-icons/react'
import type { Autor } from '../../types'
import { Avatar } from '../Avatar'
import './styles.css'

interface PerfilLateralProps {
  autor: Autor
  perfilUrl: string
  publicacoes: number
  comentarios: number
  aplausosRecebidos: number
}

export function PerfilLateral({ autor, perfilUrl, publicacoes, comentarios, aplausosRecebidos }: PerfilLateralProps) {
  return (
    <aside className="perfil" aria-label="Seu perfil">
      <div className="perfil__capa" aria-hidden="true" />
      <div className="perfil__corpo">
        <Avatar src={autor.avatar} nome={autor.nome} tamanho="g" destaque />
        <p className="perfil__nome">{autor.nome}</p>
        <p className="perfil__cargo">{autor.cargo}</p>
      </div>

      <dl className="perfil__numeros">
        <div>
          <dt>Posts</dt>
          <dd>{publicacoes}</dd>
        </div>
        <div>
          <dt>Comentários</dt>
          <dd>{comentarios}</dd>
        </div>
        <div>
          <dt>Aplausos</dt>
          <dd>{aplausosRecebidos}</dd>
        </div>
      </dl>

      <footer className="perfil__rodape">
        <a className="btn btn--outline" href={perfilUrl} target="_blank" rel="noopener noreferrer">
          <GithubLogo size={18} aria-hidden="true" />
          Ver perfil no GitHub
        </a>
      </footer>
    </aside>
  )
}
