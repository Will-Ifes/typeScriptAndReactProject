import { Trash } from '@phosphor-icons/react'
import type { Comentario as ComentarioDados } from '../../types'
import { dataCompleta, tempoRelativo } from '../../utils/tempo'
import { Avatar } from '../Avatar'
import { BotaoAplauso } from '../BotaoAplauso'
import { TextoRico } from '../TextoRico'
import './styles.css'

interface ComentarioProps {
  comentario: ComentarioDados
  agora: number
  podeRemover: boolean
  onAplaudir: () => void
  onRemover: () => void
}

export function Comentario({ comentario, agora, podeRemover, onAplaudir, onRemover }: ComentarioProps) {
  const { autor } = comentario
  return (
    <li className="comentario">
      <Avatar src={autor.avatar} nome={autor.nome} tamanho="p" />
      <div className="comentario__corpo">
        <div className="comentario__balao">
          <header className="comentario__topo">
            <div>
              <strong>{autor.nome}</strong>
              <time dateTime={comentario.criadoEm} title={dataCompleta(comentario.criadoEm)}>
                {tempoRelativo(comentario.criadoEm, agora)}
              </time>
            </div>
            {podeRemover && (
              <button type="button" className="btn btn--ghost btn--icon btn--perigo" onClick={onRemover} aria-label={`Apagar comentário de ${autor.nome}`}>
                <Trash size={18} aria-hidden="true" />
              </button>
            )}
          </header>
          <TextoRico texto={comentario.texto} />
        </div>
        <BotaoAplauso
          aplausos={comentario.aplausos}
          aplaudido={comentario.aplaudido}
          alvo={`o comentário de ${autor.nome}`}
          onAlternar={onAplaudir}
        />
      </div>
    </li>
  )
}
