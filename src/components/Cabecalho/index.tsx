import { Moon, Sun } from '@phosphor-icons/react'
import type { Tema } from '../../hooks/useTema'
import './styles.css'

interface CabecalhoProps {
  tema: Tema
  onAlternarTema: () => void
}

export function Cabecalho({ tema, onAlternarTema }: CabecalhoProps) {
  const escuro = tema === 'forest'
  return (
    <header className="cabecalho">
      <div className="cabecalho__interno">
        <a className="cabecalho__marca" href="#feed">
          <span className="cabecalho__selo" aria-hidden="true" />
          <span className="eyebrow">Lab 02 / Feed</span>
        </a>
        <button type="button" className="btn btn--outline" onClick={onAlternarTema} aria-pressed={escuro} aria-label="Tema escuro">
          {escuro ? <Moon size={18} aria-hidden="true" /> : <Sun size={18} aria-hidden="true" />}
          <span className="cabecalho__tema" aria-hidden="true">
            {escuro ? 'Floresta' : 'Papel'}
          </span>
        </button>
      </div>
    </header>
  )
}
