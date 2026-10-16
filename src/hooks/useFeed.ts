import { useEffect, useReducer } from 'react'
import { postsIniciais } from '../data/postsIniciais'
import type { Autor, Comentario, Post } from '../types'

const CHAVE = 'feed:posts:v2'

type Acao =
  | { tipo: 'publicar'; post: Post }
  | { tipo: 'removerPost'; postId: string }
  | { tipo: 'restaurarPost'; post: Post; indice: number }
  | { tipo: 'comentar'; postId: string; comentario: Comentario }
  | { tipo: 'removerComentario'; postId: string; comentarioId: string }
  | { tipo: 'restaurarComentario'; postId: string; comentario: Comentario; indice: number }
  | { tipo: 'aplaudir'; postId: string; comentarioId?: string }

function alternarAplauso<T extends { aplausos: number; aplaudido: boolean }>(item: T): T {
  return { ...item, aplaudido: !item.aplaudido, aplausos: item.aplausos + (item.aplaudido ? -1 : 1) }
}

function inserirEm<T>(lista: T[], item: T, indice: number): T[] {
  const copia = [...lista]
  copia.splice(Math.min(indice, copia.length), 0, item)
  return copia
}

function atualizarPost(posts: Post[], postId: string, mudar: (post: Post) => Post): Post[] {
  return posts.map((post) => (post.id === postId ? mudar(post) : post))
}

export function feedReducer(posts: Post[], acao: Acao): Post[] {
  switch (acao.tipo) {
    case 'publicar':
      return [acao.post, ...posts]
    case 'removerPost':
      return posts.filter((p) => p.id !== acao.postId)
    case 'restaurarPost':
      return inserirEm(posts, acao.post, acao.indice)
    case 'comentar':
      return atualizarPost(posts, acao.postId, (p) => ({ ...p, comentarios: [...p.comentarios, acao.comentario] }))
    case 'removerComentario':
      return atualizarPost(posts, acao.postId, (p) => ({
        ...p,
        comentarios: p.comentarios.filter((c) => c.id !== acao.comentarioId),
      }))
    case 'restaurarComentario':
      return atualizarPost(posts, acao.postId, (p) => ({
        ...p,
        comentarios: inserirEm(p.comentarios, acao.comentario, acao.indice),
      }))
    case 'aplaudir':
      return atualizarPost(posts, acao.postId, (p) =>
        acao.comentarioId
          ? { ...p, comentarios: p.comentarios.map((c) => (c.id === acao.comentarioId ? alternarAplauso(c) : c)) }
          : alternarAplauso(p),
      )
  }
}

function carregar(): Post[] {
  try {
    const salvo = localStorage.getItem(CHAVE)
    if (!salvo) return postsIniciais()
    const dados: unknown = JSON.parse(salvo)
    return Array.isArray(dados) ? (dados as Post[]) : postsIniciais()
  } catch {
    return postsIniciais()
  }
}

const novaInteracao = (autor: Autor, texto: string) => ({
  id: crypto.randomUUID(),
  autor,
  texto,
  criadoEm: new Date().toISOString(),
  aplausos: 0,
  aplaudido: false,
})

/** Feed salvo no navegador. As remoções devolvem o necessário para desfazer. */
export function useFeed() {
  const [posts, despachar] = useReducer(feedReducer, undefined, carregar)

  useEffect(() => {
    try {
      localStorage.setItem(CHAVE, JSON.stringify(posts))
    } catch {
      // Without storage the feed keeps working in memory.
    }
  }, [posts])

  return {
    posts,
    publicar: (autor: Autor, texto: string) => despachar({ tipo: 'publicar', post: { ...novaInteracao(autor, texto), comentarios: [] } }),
    comentar: (postId: string, autor: Autor, texto: string) =>
      despachar({ tipo: 'comentar', postId, comentario: novaInteracao(autor, texto) }),
    aplaudir: (postId: string, comentarioId?: string) => despachar({ tipo: 'aplaudir', postId, comentarioId }),
    removerPost(postId: string) {
      const indice = posts.findIndex((p) => p.id === postId)
      const post = posts[indice]
      despachar({ tipo: 'removerPost', postId })
      return post ? () => despachar({ tipo: 'restaurarPost', post, indice }) : undefined
    },
    removerComentario(postId: string, comentarioId: string) {
      const comentarios = posts.find((p) => p.id === postId)?.comentarios ?? []
      const indice = comentarios.findIndex((c) => c.id === comentarioId)
      const comentario = comentarios[indice]
      despachar({ tipo: 'removerComentario', postId, comentarioId })
      return comentario ? () => despachar({ tipo: 'restaurarComentario', postId, comentario, indice }) : undefined
    },
  }
}
