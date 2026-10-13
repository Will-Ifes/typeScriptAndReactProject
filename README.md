# Feed de publicações · TypeScript

Interface de feed com publicações e comentários em componentes React tipados.

Estudo de React, TypeScript, CSS Modules, Vite e date-fns.

## Destaques

- Publicações com autor e conteúdo.
- Inclusão e remoção de comentários.
- Aplausos e datas formatadas.

<details>
<summary><strong>Organização e código</strong></summary>

### Por dentro do código

| Código | O que observar |
| --- | --- |
| [`src/App.tsx`](src/App.tsx) | Composição do feed. |
| [`src/components/Post.tsx`](src/components/Post.tsx) | Publicação e comentários. |
| [`src/components/Comment.tsx`](src/components/Comment.tsx) | Interações do comentário. |
| [`src/components/Avatar.tsx`](src/components/Avatar.tsx) | Avatar reutilizável. |

</details>

<details>
<summary><strong>Executar e consultar</strong></summary>

### Executar localmente

Requer Node.js e npm compatíveis com as dependências versionadas.

```bash
git clone https://github.com/Will-Ifes/typeScriptAndReactProject.git
cd typeScriptAndReactProject
npm install
npm run dev
```

Abra o endereço informado pelo servidor no terminal.

### Comandos disponíveis

| Comando | Script versionado |
| --- | --- |
| `npm run dev` | `vite` |
| `npm run build` | `tsc && vite build` |
| `npm run preview` | `vite preview` |

</details>

<details>
<summary>Escopo e referências</summary>

Os dados são locais. O workflow de build está em `.github/workflows/build.yml`; consulte seu resultado na aba Actions. Persistência e testes de interação são próximos passos.

</details>

---

Mantido por **Will Oliveira** · [Perfil](https://github.com/Will-Ifes) · [LinkedIn](https://www.linkedin.com/in/wildemberg-de-jesus-oliveira/)
