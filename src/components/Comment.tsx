import { ThumbsUp, Trash } from 'phosphor-react'
import { useState } from 'react'
import { Avatar } from './Avatar'
import styles from './Comment.module.css'

interface CommentProps {
    content: string
    onDeleteComment: (comment: string) => void
}

export function Comment({ content, onDeleteComment }:CommentProps) {
    const [likeCount, setLikeCount] = useState(0)

    function handleDeleteComment() {

        onDeleteComment(content)
    }

    function handleLikeComment() {

        setLikeCount((state) => {
            return state + 1
        })

        // const newLikeCount = likeCount + 1
        // setLikeCount(newLikeCount)
    }

    return (
        <div className={styles.comment}>
            <Avatar 
                hasBorder={false} 
                src="https://github.com/Will-Ifes.png" 
                alt="Avatar"
            />
            
            <div className={styles.commentBox}>
                <div className={styles.commentContent}>
                    <header>
                        <div className={styles.authorAndTime}>
                            <strong>Wildemberg de Jesus Oliveira</strong>
                            <time title='05 de Dezembro às 18h44' dateTime='2022-12-05 18:44:55'>Cerca de 1h atrás</time>
                        </div>

                        <button onClick={handleDeleteComment} title='Deletar comentário'>
                            <Trash size={24} />
                        </button>
                    </header>

                    <p>{content}</p>
                </div>

                <footer>
                    <button onClick={handleLikeComment}>
                        <ThumbsUp size={20} /> 
                        Aplaudir <span>{likeCount}</span>
                    </button>
                </footer>
            </div>
        </div>
    )
}