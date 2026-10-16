import { paragrafos, trechos } from '../../utils/conteudo'
import './styles.css'

/** Texto do usuário em parágrafos, com URLs e domínios viram links reais. */
export function TextoRico({ texto }: { texto: string }) {
  return (
    <div className="texto-rico">
      {paragrafos(texto).map((paragrafo, i) => (
        <p key={i}>
          {trechos(paragrafo).map((t, j) =>
            t.tipo === 'link' ? (
              <a key={j} href={t.href} target="_blank" rel="noopener noreferrer">
                {t.valor}
              </a>
            ) : (
              <span key={j}>{t.valor}</span>
            ),
          )}
        </p>
      ))}
    </div>
  )
}
