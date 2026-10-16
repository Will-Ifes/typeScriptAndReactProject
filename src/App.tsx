import { useCallback, useMemo, useState } from 'react'
import { Cabecalho } from './components/Cabecalho'
import { Compositor } from './components/Compositor'
import { PerfilLateral } from './components/PerfilLateral'
import { Post } from './components/Post'
import { Toast, type ToastDados } from './components/Toast'
import { WILL } from './data/postsIniciais'
import { useAgora } from './hooks/useAgora'
import { useFeed } from './hooks/useFeed'
import { useGithubUser } from './hooks/useGithubUser'
import { useTema } from './hooks/useTema'
import type { Autor } from './types'
import './styles/global.css'
import './App.css'

type Ordem = 'recentes' | 'aplaudidos'

export function App() {
  const { posts, publicar, comentar, aplaudir, removerPost, removerComentario } = useFeed()
  const { tema, alternar } = useTema()
  const github = useGithubUser('Will-Ifes')
  const agora = useAgora()
  const [ordem, setOrdem] = useState<Ordem>('recentes')
  const [toast, setToast] = useState<ToastDados | null>(null)
  const fecharToast = useCallback(() => setToast(null), [])

  // Até o GitHub responder (ou se falhar), o perfil usa os dados locais
  const usuario: Autor = github.status === 'ok' ? { ...WILL, nome: github.usuario.nome, avatar: github.usuario.avatar } : WILL
  const perfilUrl = github.status === 'ok' ? github.usuario.perfil : 'https://github.com/Will-Ifes'

  const ordenados = useMemo(() => {
    const lista = [...posts]
    if (ordem === 'aplaudidos') lista.sort((a, b) => b.aplausos - a.aplausos)
    return lista
  }, [posts, ordem])

  const meus = posts.filter((p) => p.autor.nome === usuario.nome)
  const estatisticas = {
    publicacoes: meus.length,
    comentarios: posts.reduce((n, p) => n + p.comentarios.filter((c) => c.autor.nome === usuario.nome).length, 0),
    aplausosRecebidos: meus.reduce((n, p) => n + p.aplausos, 0),
  }

  function avisarDesfazer(mensagem: string, desfazer?: () => void) {
    setToast({ id: Date.now(), mensagem, acao: desfazer ? { rotulo: 'Desfazer', executar: desfazer } : undefined })
  }

  return (
    <>
      <a className="pular" href="#feed">
        Pular para o feed
      </a>
      <Cabecalho tema={tema} onAlternarTema={alternar} />

      <div className="layout">
        <PerfilLateral autor={usuario} perfilUrl={perfilUrl} {...estatisticas} />

        <main id="feed" className="feed" tabIndex={-1}>
          <div className="feed__titulo">
            <p className="eyebrow">Ignite · React e TypeScript</p>
            <h1>Feed</h1>
          </div>

          <section className="feed__novo" aria-label="Nova publicação">
            <Compositor
              autor={usuario}
              rotulo="O que você quer compartilhar?"
              placeholder="Escreva um post. Links como github.com/Will-Ifes viram links clicáveis."
              acao="Publicar"
              limite={500}
              onEnviar={(texto) => {
                publicar(usuario, texto)
                avisarDesfazer('Post publicado.')
              }}
            />
          </section>

          <div className="feed__barra">
            <p className="feed__contagem">{posts.length === 1 ? '1 post' : `${posts.length} posts`}</p>
            <div className="segmentado" role="group" aria-label="Ordenar posts">
              {(['recentes', 'aplaudidos'] as const).map((opcao) => (
                <button key={opcao} type="button" aria-pressed={ordem === opcao} onClick={() => setOrdem(opcao)}>
                  {opcao === 'recentes' ? 'Recentes' : 'Mais aplaudidos'}
                </button>
              ))}
            </div>
          </div>

          {ordenados.length === 0 ? (
            <p className="feed__vazio">Nenhum post ainda. Escreva o primeiro acima.</p>
          ) : (
            <div className="feed__lista">
              {ordenados.map((post) => (
                <Post
                  key={post.id}
                  post={post}
                  usuario={usuario}
                  agora={agora}
                  onAplaudir={(comentarioId) => aplaudir(post.id, comentarioId)}
                  onComentar={(texto) => comentar(post.id, usuario, texto)}
                  onRemoverComentario={(comentarioId) => avisarDesfazer('Comentário apagado.', removerComentario(post.id, comentarioId))}
                  onRemover={() => avisarDesfazer('Post apagado.', removerPost(post.id))}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      <Toast toast={toast} onFechar={fecharToast} />
    </>
  )
}
