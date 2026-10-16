import type { Autor, Post } from '../types'

export const WILL: Autor = {
  nome: 'Will Oliveira',
  cargo: 'Desenvolvedor Frontend',
  avatar: 'https://github.com/Will-Ifes.png',
}

const MAYK: Autor = {
  nome: 'Mayk Brito',
  cargo: 'Educator @Rocketseat',
  avatar: 'https://github.com/maykbrito.png',
}

const horasAtras = (horas: number) => new Date(Date.now() - horas * 3_600_000).toISOString()

/** Conteúdo de exemplo para o feed não abrir vazio na primeira visita */
export function postsIniciais(): Post[] {
  return [
    {
      id: 'inicial-will',
      autor: WILL,
      texto:
        'Fala, pessoal 👋\n\nRevisei este feed, que fiz no Ignite da Rocketseat: agora em React 19 e TypeScript, com a base visual do Will Labs, testes e acessibilidade conferida.\n\ngithub.com/Will-Ifes/typeScriptAndReactProject',
      criadoEm: horasAtras(2),
      aplausos: 4,
      aplaudido: false,
      comentarios: [
        {
          id: 'inicial-comentario',
          autor: MAYK,
          texto: 'Ficou muito bom! Gostei do tema escuro.',
          criadoEm: horasAtras(1),
          aplausos: 2,
          aplaudido: false,
        },
      ],
    },
    {
      id: 'inicial-mayk',
      autor: MAYK,
      texto:
        'Fala, galera 👋\n\nAcabei de subir mais um projeto no meu portfólio. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀\n\njane.design/doctorcare',
      criadoEm: horasAtras(26),
      aplausos: 12,
      aplaudido: false,
      comentarios: [],
    },
  ]
}
