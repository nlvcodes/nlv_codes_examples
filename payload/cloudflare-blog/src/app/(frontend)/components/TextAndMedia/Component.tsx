// @/app/(frontend)/components/TextAndMedia/Component.tsx
import type { Media, TextAndMediaProps } from '@/payload-types'
import React from 'react'
import Image from 'next/image'
import { RichText } from '../RichText/Component'
import styles from './Component.module.css'

export const TextAndMedia = ({ text, media }: TextAndMediaProps) => {
  const image = media as Media
  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <div className={styles.text}>
          <RichText data={text} />
        </div>
        {typeof media !== 'number' && (
          <Image className={styles.image} src={image.url} alt={image.alt} width={image.width} height={image.height} />
        )}
      </div>
    </section>
  )
}
