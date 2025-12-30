import React from 'react'
import {
  Body,
  Button,
  Container,
  Heading,
  Head,
  Img,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
} from '@react-email/components'
import { TypedEditorState } from '@payloadcms/richtext-lexical'
import { Media } from '@/payload-types'
import { convertLexicalToPlaintext } from '@payloadcms/richtext-lexical/plaintext'
import { RichText } from '@payloadcms/richtext-lexical/react'

type NewPostAlertArgs = {
  summary?: TypedEditorState | null
  title?: string | null
  slug: string
  date?: Date | string | null
  image?: Media | null
}

NewPostAlert.PreviewProps = {
  title: 'Getting Started with React Email',
  slug: 'getting-started-with-react-email',
  date: new Date(),
  image: {
    url: 'https://picsum.photos/640/360',
    alt: 'Tutorial preview',
    width: 640,
    height: 360,
  },
  summary: {
    root: {
      children: [
        {
          children: [
            {
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: 'This is a ',
              type: 'text',
              version: 1,
            },
            {
              detail: 0,
              format: 2,
              mode: 'normal',
              style: '',
              text: 'test',
              type: 'text',
              version: 1,
            },
            {
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: ' ',
              type: 'text',
              version: 1,
            },
            {
              detail: 0,
              format: 8,
              mode: 'normal',
              style: '',
              text: 'post',
              type: 'text',
              version: 1,
            },
            {
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: ' with ',
              type: 'text',
              version: 1,
            },
            {
              detail: 0,
              format: 1,
              mode: 'normal',
              style: '',
              text: 'rich',
              type: 'text',
              version: 1,
            },
            {
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: ' text. Learn how to create beautiful, responsive email templates using React Email and modern web development practices.',
              type: 'text',
              version: 1,
            },
          ],
          direction: null,
          format: '',
          indent: 0,
          type: 'paragraph',
          version: 1,
          textFormat: 0,
          textStyle: '',
        },
      ],
      direction: null,
      format: '',
      indent: 0,
      type: 'root',
      version: 1,
    },
  },
} as unknown as NewPostAlertArgs

export default function NewPostAlert({ summary, image, title, slug, date }: NewPostAlertArgs) {
  return (
    <Html>
      <Head />
      {summary && <Preview>{convertLexicalToPlaintext({ data: summary })}</Preview>}
      <Tailwind>
        <Body className="bg-[#f6f9fc] font-sans">
          <Container className="mx-auto my-10 max-w-xl bg-white rounded-lg shadow-md overflow-hidden">
            <Section className="bg-emerald-900 py-12 px-10 text-center">
              <Heading className="text-emerald-100 text-3xl font-bold leading-tight m-0 mb-3">
                {title}
              </Heading>
              <Heading
                as={'h2'}
                className={'text-emerald-200 text-lg font-normal m-0 uppercase tracking-wide'}
              >
                now available!
              </Heading>
            </Section>
            {image && (
              <Section className="px-10 py-5">
                <Link
                  href={`${process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000'}/posts/${slug}`}
                >
                  <Img
                    src={`${image.url!}`}
                    alt={image.alt || ''}
                    width={image.width || 640}
                    height={image.height || 360}
                    className="w-full h-auto block rounded-lg shadow-md"
                  />
                </Link>
              </Section>
            )}
            <Section className="px-10 py-5">
              <Section className="text-center mb-8">
                <Button
                  href={`${process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000'}/posts/${slug}`}
                  className="bg-emerald-600 rounded-md text-emerald-50 text-base font-semibold no-underline text-center inline-block py-3.5 px-8 mb-4 leading-normal"
                >
                  Read Now
                </Button>
              </Section>
              <Heading
                as={'h3'}
                className="text-gray-900 text-xl font-semibold m-0 mb-4 leading-snug"
              >
                Here's a sneak peek:
              </Heading>
              {date && (
                <Text className="text-gray-500 text-sm m-0 mb-5 italic">
                  {new Date(date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </Text>
              )}
              {summary && <RichText data={summary} />}
            </Section>
            <Section className="bg-gray-50 py-8 px-10 text-center border-t border-gray-200">
              <Text className="text-gray-500 text-sm leading-normal m-0 mb-2">
                You're receiving this email because you signed up for updates.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
