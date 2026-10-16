import { describe, expect, it } from 'vitest'
import { paragrafos, trechos } from './conteudo'
import { tempoRelativo } from './tempo'

describe('conteudo', () => {
  it('separa parágrafos por linha em branco', () => {
    expect(paragrafos('Oi\n\nTudo bem?\n\n\n')).toEqual(['Oi', 'Tudo bem?'])
  })

  it('transforma URLs e domínios em links, sem levar a pontuação final', () => {
    expect(trechos('Veja jane.design/doctorcare, e https://github.com!')).toEqual([
      { tipo: 'texto', valor: 'Veja ' },
      { tipo: 'link', valor: 'jane.design/doctorcare', href: 'https://jane.design/doctorcare' },
      { tipo: 'texto', valor: ', e ' },
      { tipo: 'link', valor: 'https://github.com', href: 'https://github.com' },
      { tipo: 'texto', valor: '!' },
    ])
  })

  it('não cria link em texto comum com ponto final', () => {
    expect(trechos('Fim de frase.')).toEqual([{ tipo: 'texto', valor: 'Fim de frase.' }])
  })
})

describe('tempo', () => {
  const base = new Date('2026-10-16T12:00:00Z').getTime()
  const antes = (segundos: number) => new Date(base - segundos * 1000).toISOString()

  it('descreve o tempo em português', () => {
    expect(tempoRelativo(antes(10), base)).toBe('agora')
    expect(tempoRelativo(antes(5 * 60), base)).toBe('há 5 minutos')
    expect(tempoRelativo(antes(3 * 3600), base)).toBe('há 3 horas')
    expect(tempoRelativo(antes(26 * 3600), base)).toBe('ontem')
  })
})
