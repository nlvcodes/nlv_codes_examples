// @/app/(frontend)/components/RichText/Component.tsx
import { RichText as RichTextConverter } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import React, { JSX } from 'react'
import { type JSXConvertersFunction, LinkJSXConverter } from '@payloadcms/richtext-lexical/react'
import styles from './Component.module.css'
import type { DefaultNodeTypes, SerializedBlockNode } from '@payloadcms/richtext-lexical'
import { TextAndMedia } from '../TextAndMedia/Component'
import type { TextAndMediaProps } from '@/payload-types'
import type { SerializedLinkNode } from '@payloadcms/richtext-lexical'

type NodeTypes = DefaultNodeTypes | SerializedBlockNode<TextAndMediaProps>

export const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!

  if (typeof value !== 'object') throw new Error('Expected an object')

  const slug = value.slug

  return `/${relationTo}/${slug}`
}

export const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  blocks: {
    textAndMedia: ({ node }) => (
      <TextAndMedia {...node.fields} />
    ),
  },
})

type Props = {
  data: SerializedEditorState
} & React.HTMLAttributes<HTMLDivElement>

export function RichText(props: Props): JSX.Element {
  const { className, ...rest } = props
  return (
    <RichTextConverter
      disableContainer
      converters={jsxConverters}
      {...rest}
      className={[styles.richText, className].filter(Boolean).join(' ')}
    />
  )
}