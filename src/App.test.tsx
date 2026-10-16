import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { App } from './App'

const perfil = {
  name: 'Will Oliveira',
  login: 'Will-Ifes',
  avatar_url: 'https://example.com/will.png',
  html_url: 'https://github.com/Will-Ifes',
}

function mockGithub(resposta: Partial<Response> = {}) {
  vi.spyOn(globalThis, 'fetch').mockResolvedValue({ ok: true, status: 200, json: async () => perfil, ...resposta } as Response)
}

const posts = () => screen.getAllByRole('article')
const postDe = (nome: string) => posts().find((p) => within(p).queryByRole('heading', { name: nome }))!

describe('Feed', () => {
  beforeEach(() => mockGithub())

  it('abre com os posts de exemplo e links clicáveis', () => {
    render(<App />)
    expect(posts()).toHaveLength(2)
    const link = within(postDe('Mayk Brito')).getByRole('link', { name: 'jane.design/doctorcare' })
    expect(link).toHaveAttribute('href', 'https://jane.design/doctorcare')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('publica um post no topo e limpa o compositor', async () => {
    const user = userEvent.setup()
    render(<App />)

    const campo = screen.getByLabelText('O que você quer compartilhar?')
    expect(screen.getByRole('button', { name: 'Publicar' })).toBeDisabled()
    await user.type(campo, 'Primeiro post do dia')
    await user.click(screen.getByRole('button', { name: 'Publicar' }))

    expect(posts()).toHaveLength(3)
    expect(within(posts()[0]!).getByText('Primeiro post do dia')).toBeInTheDocument()
    expect(campo).toHaveValue('')
  })

  it('publica com Ctrl+Enter e ignora texto só de espaços', async () => {
    const user = userEvent.setup()
    render(<App />)

    const campo = screen.getByLabelText('O que você quer compartilhar?')
    await user.type(campo, '   {Control>}{Enter}{/Control}')
    expect(posts()).toHaveLength(2)

    await user.type(campo, 'Atalho funcionando{Control>}{Enter}{/Control}')
    expect(posts()).toHaveLength(3)
  })

  it('comentários iguais não colidem e apagar remove só um, com desfazer', async () => {
    const user = userEvent.setup()
    render(<App />)
    const post = postDe('Mayk Brito')

    await user.click(within(post).getByRole('button', { name: 'Comentar' }))
    const campo = within(post).getByLabelText('Comentar no post de Mayk Brito')
    await user.type(campo, 'Muito bom!{Control>}{Enter}{/Control}')
    await user.type(campo, 'Muito bom!{Control>}{Enter}{/Control}')
    expect(within(post).getAllByText('Muito bom!')).toHaveLength(2)

    const [primeiro] = within(post).getAllByRole('button', { name: 'Apagar comentário de Will Oliveira' })
    await user.click(primeiro!)
    expect(within(post).getAllByText('Muito bom!')).toHaveLength(1)

    await user.click(screen.getByRole('button', { name: 'Desfazer' }))
    expect(within(post).getAllByText('Muito bom!')).toHaveLength(2)
  })

  it('aplauso alterna e não soma infinitamente', async () => {
    const user = userEvent.setup()
    render(<App />)
    const post = postDe('Mayk Brito')

    const botao = within(post).getByRole('button', { name: /^Aplaudir o post de Mayk Brito/ })
    expect(botao).toHaveAccessibleName('Aplaudir o post de Mayk Brito, 12 aplausos')
    await user.click(botao)
    expect(botao).toHaveAttribute('aria-pressed', 'true')
    expect(botao).toHaveAccessibleName('Aplaudir o post de Mayk Brito, 13 aplausos')
    await user.click(botao)
    expect(botao).toHaveAccessibleName('Aplaudir o post de Mayk Brito, 12 aplausos')
  })

  it('só deixa apagar os próprios posts e ordena pelos mais aplaudidos', async () => {
    const user = userEvent.setup()
    render(<App />)

    expect(within(postDe('Mayk Brito')).queryByRole('button', { name: 'Apagar este post' })).not.toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Mais aplaudidos' }))
    expect(within(posts()[0]!).getByRole('heading')).toHaveTextContent('Mayk Brito')

    await user.click(within(postDe('Will Oliveira')).getByRole('button', { name: 'Apagar este post' }))
    expect(posts()).toHaveLength(1)
    await user.click(screen.getByRole('button', { name: 'Desfazer' }))
    expect(posts()).toHaveLength(2)
  })

  it('mantém o feed depois de recarregar', async () => {
    const user = userEvent.setup()
    const { unmount } = render(<App />)
    await user.type(screen.getByLabelText('O que você quer compartilhar?'), 'Post salvo{Control>}{Enter}{/Control}')
    unmount()

    render(<App />)
    expect(screen.getByText('Post salvo')).toBeInTheDocument()
  })

  it('usa o perfil local quando o GitHub falha', async () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {})
    mockGithub({ ok: false, status: 403 })
    render(<App />)

    await waitFor(() => expect(fetch).toHaveBeenCalled())
    const perfilLateral = screen.getByRole('complementary', { name: 'Seu perfil' })
    expect(within(perfilLateral).getByText('Will Oliveira')).toBeInTheDocument()
    expect(within(perfilLateral).getByRole('link', { name: /Ver perfil no GitHub/ })).toHaveAttribute('href', 'https://github.com/Will-Ifes')
  })

  it('alterna para o tema escuro', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: 'Tema escuro' }))
    expect(document.documentElement.dataset.tema).toBe('forest')
  })
})
