import { useId, useState, type FormEvent, type KeyboardEvent } from 'react'
import type { Autor } from '../../types'
import { Avatar } from '../Avatar'
import './styles.css'

interface CompositorProps {
  autor: Autor
  rotulo: string
  placeholder: string
  acao: string
  limite: number
  compacto?: boolean
  onEnviar: (texto: string) => void
}

/** Campo de texto com contador e Ctrl+Enter, usado para posts e para comentários. */
export function Compositor({ autor, rotulo, placeholder, acao, limite, compacto = false, onEnviar }: CompositorProps) {
  const [texto, setTexto] = useState('')
  const id = useId()
  const limpo = texto.trim()
  const restante = limite - texto.length
  const vazio = limpo.length === 0

  function enviar(evento?: FormEvent) {
    evento?.preventDefault()
    if (vazio) return
    onEnviar(limpo)
    setTexto('')
  }

  function atalho(evento: KeyboardEvent<HTMLTextAreaElement>) {
    if (evento.key === 'Enter' && (evento.ctrlKey || evento.metaKey)) enviar()
  }

  return (
    <form className="compositor" data-compacto={compacto || undefined} onSubmit={enviar}>
      {!compacto && <Avatar src={autor.avatar} nome={autor.nome} />}
      <div className="compositor__campo">
        <label htmlFor={id} className={compacto ? 'sr-only' : 'compositor__rotulo'}>
          {rotulo}
        </label>
        <textarea
          id={id}
          value={texto}
          maxLength={limite}
          rows={compacto ? 2 : 3}
          placeholder={placeholder}
          aria-describedby={`${id}-ajuda`}
          onChange={(e) => setTexto(e.target.value)}
          onKeyDown={atalho}
        />
        <div className="compositor__rodape">
          <p id={`${id}-ajuda`} className="compositor__ajuda">
            <span data-alerta={restante < 40 || undefined}>{restante} caracteres restantes</span>
            <span className="compositor__atalho">
              · <kbd>Ctrl</kbd> + <kbd>Enter</kbd> envia
            </span>
          </p>
          <button type="submit" className="btn btn--primary" disabled={vazio}>
            {acao}
          </button>
        </div>
      </div>
    </form>
  )
}
