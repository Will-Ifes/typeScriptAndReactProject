export type Trecho = { tipo: 'texto'; valor: string } | { tipo: 'link'; valor: string; href: string }

// Matches full URLs and bare domains such as "jane.design/doctorcare".
const PADRAO_LINK = /\b((?:https?:\/\/)?(?:[a-z0-9-]+\.)+[a-z]{2,}(?:\/[^\s]*)?)/gi

export function paragrafos(texto: string): string[] {
  return texto
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
}

export function trechos(paragrafo: string): Trecho[] {
  const resultado: Trecho[] = []
  let ultimo = 0
  for (const encontrado of paragrafo.matchAll(PADRAO_LINK)) {
    const inicio = encontrado.index ?? 0
    const valor = encontrado[0].replace(/[.,!?)]+$/, '')
    if (inicio > ultimo) resultado.push({ tipo: 'texto', valor: paragrafo.slice(ultimo, inicio) })
    resultado.push({ tipo: 'link', valor, href: valor.startsWith('http') ? valor : `https://${valor}` })
    ultimo = inicio + valor.length
  }
  if (ultimo < paragrafo.length) resultado.push({ tipo: 'texto', valor: paragrafo.slice(ultimo) })
  return resultado
}
