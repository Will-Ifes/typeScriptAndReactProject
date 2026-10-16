import { HandsClapping } from '@phosphor-icons/react'
import './styles.css'

interface BotaoAplausoProps {
  aplausos: number
  aplaudido: boolean
  /** Completa o nome acessível: "Aplaudir o comentário de Ana" */
  alvo: string
  onAlternar: () => void
}

export function BotaoAplauso({ aplausos, aplaudido, alvo, onAlternar }: BotaoAplausoProps) {
  return (
    <button
      type="button"
      className="aplauso"
      aria-pressed={aplaudido}
      onClick={onAlternar}
      aria-label={`Aplaudir ${alvo}, ${aplausos} ${aplausos === 1 ? 'aplauso' : 'aplausos'}`}
    >
      <HandsClapping size={18} weight={aplaudido ? 'fill' : 'regular'} aria-hidden="true" />
      <span>{aplaudido ? 'Aplaudido' : 'Aplaudir'}</span>
      <span className="aplauso__contagem">{aplausos}</span>
    </button>
  )
}
