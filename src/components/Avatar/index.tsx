import { useState } from 'react'
import './styles.css'

interface AvatarProps {
  src: string
  nome: string
  tamanho?: 'p' | 'm' | 'g'
  destaque?: boolean
}

const iniciais = (nome: string) =>
  nome
    .split(/\s+/)
    .filter(Boolean)
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

/** Foto com moldura diagonal; se a imagem falhar, mostra as iniciais. */
export function Avatar({ src, nome, tamanho = 'm', destaque = false }: AvatarProps) {
  const [falhou, setFalhou] = useState(false)

  return (
    <span className="avatar" data-tamanho={tamanho} data-destaque={destaque || undefined} aria-hidden="true">
      {falhou ? <span className="avatar__iniciais">{iniciais(nome)}</span> : <img src={src} alt="" onError={() => setFalhou(true)} />}
    </span>
  )
}
