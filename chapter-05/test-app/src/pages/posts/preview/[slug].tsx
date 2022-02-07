import { GetStaticPaths, GetStaticProps } from 'next'
import { useSession } from 'next-auth/client'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { RichText } from 'prismic-dom'
import { useEffect } from 'react'

import { getPrismicClient } from '../../../services/prismic'

import styles from '../post.module.scss'

type Post = {
  slug: string
  title: string
  content: string
  updatedAt: string
}

interface PostPreviewProps {
  post: Post
}

export default function PostPreview({ post }: PostPreviewProps) {
  const [session] = useSession();
  const router = useRouter();

  useEffect(() => {
    console.log('useEffect')

    if (session?.activeSubscription) {
      console.log('entrou')
      router.push(`/posts/${post.slug}`)
    }
  }, [session, router])

  return (
    <>
      <Head>
        <title>{post.title} | Ig.news</title>
      </Head>

      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>

          <div 
            className={`${styles.postContent} ${styles.previewContent}`}
            dangerouslySetInnerHTML={{ __html:post.content }} 
          />

          <div className={styles.continueReading}>
            Wanna continue reading?

            <Link href="/">
              <a>Subscribe now 🤗️</a>
            </Link>
          </div>
        </article>
      </main>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'

    // true: carrega a página no client side caso a página ainda não tenha sido gerada
    // false: retorna 404 caso a página ainda não tenha sido gerada
    // blocking: carrega a página no server side caso a página ainda não tenha sido gerada
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params
  
  const prismic = getPrismicClient()
  const response = await prismic.getByUID('publication', String(slug), {})

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content.splice(0, 3)),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  }

  const HALF_HOUR_IN_SECONDS = 60 * 30;

  return {
    props: {
      post
    },
    revalidate: HALF_HOUR_IN_SECONDS
  }
}