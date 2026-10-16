import { ChatCircle, Trash } from '@phosphor-icons/react'
import { useState } from 'react'
import type { Autor, Post as PostDados } from '../../types'
import { dataCompleta, tempoRelativo } from '../../utils/tempo'
import { Avatar } from '../Avatar'
import { BotaoAplauso } from '../BotaoAplauso'
import { Comentario } from '../Comentario'
import { Compositor } from '../Compositor'
import { TextoRico } from '../TextoRico'
import './styles.css'

interface PostProps {
  post: PostDados
  usuario: Autor
  agora: number
  onAplaudir: (comentarioId?: string) => void
  onComentar: (texto: string) => void
  onRemoverComentario: (comentarioId: string) => void
  onRemover: () => void
}

const doUsuario = (autor: Autor, usuario: Autor) => autor.nome === usuario.nome

export function Post({ post, usuario, agora, onAplaudir, onComentar, onRemoverComentario, onRemover }: PostProps) {
  const [comentando, setComentando] = useState(false)
  const { autor } = post
  const total = post.comentarios.length
  const tituloId = `post-${post.id}-autor`

  return (
    <article className="post" aria-labelledby={tituloId}>
      <header className="post__topo">
        <Avatar src={autor.avatar} nome={autor.nome} destaque />
        <div className="post__autor">
          <h2 id={tituloId}>{autor.nome}</h2>
          <p>
            {autor.cargo} ·{' '}
            <time dateTime={post.criadoEm} title={dataCompleta(post.criadoEm)}>
              {tempoRelativo(post.criadoEm, agora)}
            </time>
          </p>
        </div>
        {doUsuario(autor, usuario) && (
          <button type="button" className="btn btn--ghost btn--icon btn--perigo" onClick={onRemover} aria-label="Apagar este post">
            <Trash size={18} aria-hidden="true" />
          </button>
        )}
      </header>

      <TextoRico texto={post.texto} />

      <div className="post__acoes">
        <BotaoAplauso aplausos={post.aplausos} aplaudido={post.aplaudido} alvo={`o post de ${autor.nome}`} onAlternar={() => onAplaudir()} />
        <button type="button" className="btn btn--ghost" aria-expanded={comentando} onClick={() => setComentando((v) => !v)}>
          <ChatCircle size={18} aria-hidden="true" />
          {total === 0 ? 'Comentar' : `${total} ${total === 1 ? 'comentário' : 'comentários'}`}
        </button>
      </div>

      {(comentando || total > 0) && (
        <section className="post__comentarios" aria-label={`Comentários do post de ${autor.nome}`}>
          {total > 0 && (
            <ul className="post__lista">
              {post.comentarios.map((c) => (
                <Comentario
                  key={c.id}
                  comentario={c}
                  agora={agora}
                  podeRemover={doUsuario(c.autor, usuario)}
                  onAplaudir={() => onAplaudir(c.id)}
                  onRemover={() => onRemoverComentario(c.id)}
                />
              ))}
            </ul>
          )}
          <Compositor
            autor={usuario}
            rotulo={`Comentar no post de ${autor.nome}`}
            placeholder="Escreva um comentário"
            acao="Comentar"
            limite={280}
            compacto
            onEnviar={onComentar}
          />
        </section>
      )}
    </article>
  )
}
