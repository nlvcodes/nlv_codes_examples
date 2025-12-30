import type { CollectionConfig } from 'payload'
import ForgotPasswordEmail from '../../emails/forgot-password-email'
import {render} from '@react-email/components'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: {
    forgotPassword: {
      generateEmailHTML: async (args) =>
        await render(
          ForgotPasswordEmail({
            cta: {
              buttonLabel: 'Reset your password',
              url: `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/admin/reset/${args?.token}`,
            },
            content: "Let's get you back in",
            headline: "Locked out?",
            email: args?.user.email,
          }),
        ),
      generateEmailSubject: (args) => `Reset your password for ${args?.user.email}`
    },
  },
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
}
