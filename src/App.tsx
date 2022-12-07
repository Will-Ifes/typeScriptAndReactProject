// JSX é JavaScript + XML (HTML)

import { Header } from "./components/Header"
import { Sidebar } from "./components/Sidebar"
import { Post } from "./components/Post"

import styles from './App.module.css'
import './global.css'


// author: { avatar_url "", name: "", role: " "}
// publishedAt: Date
// content: String

const posts = [
  {
    id: 1,
    author: {
      avatarUrl: 'https://github.com/Will-Ifes.png',
      name: 'Wildemberg de Jesus',
      role: 'React Developer'
    },

    content: [
      {type: 'paragraph', content: 'Fala galeraa 👋'},
      {type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀'},
      {type: 'link', content:'jane.design/doctorcare'},
      
    ],
    publisheAt: new Date('2022-12-06 14:10:00')
  },
  {
    id: 2,
    author: {
      avatarUrl: 'https://github.com/maykbrito.png',
      name: 'Mayk Brito',
      role: 'Educator @Rocketseat '
    },

    content: [
      {type: 'paragraph', content: 'Fala galeraa 👋'},
      {type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀'},
      {type: 'link', content:'jane.design/doctorcare'},
      
    ],
    publisheAt: new Date('2022-12-06 16:10:00')
  }
]

// iteração

export function App() {

  return (
    <div>
      <Header />

      <div className={styles.wrapper} >
        <Sidebar />

        <main>
          {posts.map(post => {
            return (
              <Post
              key={post.id}
                author={post.author}
                content={post.content}
                publisheAt={post.publisheAt}
              />
            )
          })}
        </main>
      </div>
    </div>
  )
}


