import type { PayloadRequest } from 'payload'
import type { User } from '@/payload-types'
import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Heading,
  Text,
  Button,
  Hr,
  Link,
} from '@react-email/components'

type ForgotPasswordEmailArgs =
  | {
      req?: PayloadRequest
      token?: string
      user?: User
      cta: {
        buttonLabel: string
        url: string
      }
      content: string
      headline: string
      email: string
    }
  | undefined

export default function ForgotPasswordEmail(args: ForgotPasswordEmailArgs) {
  return (
    <Html>
      <Head />
      <Preview>Forgot your password? Reset it now.</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={headline}>{args?.headline}</Heading>
          </Section>
          <Section style={content}>
            <Heading style={heading}>{args?.cta.buttonLabel}</Heading>
            <Text style={paragraph}>{args?.content}</Text>
            <Section style={buttonContainer}>
              <Button style={button} href={args?.cta.url}>
                {args?.cta.buttonLabel}
              </Button>
            </Section>
            <Hr style={hr} />
            <Text style={altMethod}>
              Having trouble with the button? Copy and paste this link into your browser:
            </Text>
            <Section style={linkContainer}>
              <Link style={link} href={args?.cta.url}>
                {args?.cta.url}
              </Link>
            </Section>
          </Section>
          <Section style={footer}>
            <Text style={footerText}>
              You received this email because some requested a password reset for {args?.email}. If
              this wasn&apos;t you, you can safely ignore this email.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

ForgotPasswordEmail.PreviewProps = {
  cta: {
    buttonLabel: 'Reset password',
    url: 'http://localhost:3000/test',
  },
  content: "Let's get you back in",
  headline: 'Locked out?',
  email: 'nick@nlvogel.com',
}

const main = {
  backgroundColor: '#f9fafb',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
  margin: '40px auto',
  width: '100%',
  maxWidth: '560px',
}

const header = {
  backgroundColor: '#065f46',
  borderRadius: '8px 8px 0 0',
  padding: '40px 48px 36px',
  textAlign: 'center' as const,
}

const headline = {
  color: '#DDFCE2',
  fontSize: '28px',
  fontWeight: 700,
  margin: 0,
  letterSpacing: '-0.5px',
}

const content = {
  backgroundColor: '#fff',
  padding: '48px',
  borderLeft: '1px solid #e5e7eb',
  borderRight: '1px solid #e5e7eb',
}

const heading = {
  color: '#111827',
  fontSize: '24px',
  fontWeight: '600',
  lineHeight: '1.3',
  margin: '0 0 24px',
}

const paragraph = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0 0 24px'
}

const buttonContainer = {
  margin: '32px 0',
}

const button = {
  backgroundColor: '#10b981',
  borderRadius: '6px',
  color: '#fff',
  display: 'block',
  fontSize: '16px',
  fontWeight: '600',
  padding: '14px 24px',
  textAlign: 'center' as const,
  textDecoration: 'none',
  width: '100%',
  maxWidth: '250px',
  margin: '0 auto',
}

const hr = {
  borderColor: '#e5e7eb',
  margin: '32px 0',
}

const altMethod = {
  color: '#6b7280',
  fontSize: '14px',
  margin: '0 0 12px',
}

const linkContainer = {
  backgroundColor: '#f9fafb',
  borderRadius: '6px',
  padding: '12px',
  wordBreak: 'break-all' as const,
}

const link = {
  color: '#059669',
  fontSize: '13px',
  textDecoration: 'none',
}

const footer = {
  backgroundColor: '#f9fafb',
  borderRadius: '0 0 8px 8px',
  padding: '32px 48px',
  borderBottom: '1px solid #e5e7eb',
  borderRight: '1px solid #e5e7eb',
  borderLeft: '1px solid #e5e7eb',
}

const footerText = {
  color: '#6b7280',
  fontSize: '13px',
  textAlign: 'center' as const,
  margin: '0 0 8px',
  lineHeight: '20px'
}
