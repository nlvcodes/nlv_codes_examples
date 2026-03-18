// @/app/(frontend)/posts/[slug]/page.tsx
import { getPayload } from 'payload'
import config from '@payload-config'
import { RichText } from '@/app/(frontend)/components/RichText/Component'
import Image from 'next/image'
import styles from './page.module.css'

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'posts',
    depth: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
  })
  const { title, body, categories, image } = docs[0]
  return (
    <main className={styles.post}>
      <header className={styles.hero}>
        {image && typeof image !== 'number' && (
          <Image className={styles.heroImage} src={image.url} alt={image.alt} fill sizes="1024px" />
        )}
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1 className={styles.title}>{title}</h1>
          {categories && (
            <ul className={styles.categories}>
              {categories.map((category) => {
                if (typeof category !== 'number') {
                  return <li className={styles.category} key={category.id}>{category.name}</li>
                }
              })}
            </ul>
          )}
        </div>
      </header>
      <RichText data={body} />
    </main>
  )
}
