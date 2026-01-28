import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { Plugin } from 'payload'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { FixedToolbarFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { ecommercePlugin } from '@payloadcms/plugin-ecommerce'

import { stripeAdapter } from '@payloadcms/plugin-ecommerce/payments/stripe'

import { Page, Product } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'
import { ProductsCollection } from '@/collections/Products'
import { adminOrPublishedStatus } from '@/access/adminOrPublishedStatus'
import { adminOnlyFieldAccess } from '@/access/adminOnlyFieldAccess'
import { customerOnlyFieldAccess } from '@/access/customerOnlyFieldAccess'
import { isAdmin } from '@/access/isAdmin'
import { isDocumentOwner } from '@/access/isDocumentOwner'
import { checkRole } from '@/access/utilities'
import { publicAccess } from '@/access/publicAccess'
import { adminOnly } from '@/access/adminOnly'

const generateTitle: GenerateTitle<Product | Page> = ({ doc }) => {
  return doc?.title ? `${doc.title} | Payload Ecommerce Template` : 'Payload Ecommerce Template'
}

const generateURL: GenerateURL<Product | Page> = ({ doc }) => {
  const url = getServerSideURL()

  return doc?.slug ? `${url}/${doc.slug}` : url
}

export const plugins: Plugin[] = [
  seoPlugin({
    generateTitle,
    generateURL,
  }),
  formBuilderPlugin({
    fields: {
      payment: false,
    },
    formSubmissionOverrides: {
      admin: {
        group: 'Content',
      },
    },
    formOverrides: {
      admin: {
        group: 'Content',
      },
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'confirmationMessage') {
            return {
              ...field,
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    FixedToolbarFeature(),
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                  ]
                },
              }),
            }
          }
          return field
        })
      },
    },
  }),
  ecommercePlugin({
    access: {
      adminOnlyFieldAccess,
      adminOrPublishedStatus,
      customerOnlyFieldAccess,
      isAdmin,
      isDocumentOwner,
    },
    addresses: {
      addressFields: ({ defaultFields }) => [
        ...defaultFields.map((field) => {
          if ('name' in field && field.name === 'addressLine1') {
            return {
              ...field,
              required: true,
            }
          }
          return field
        }),
      ],
      addressesCollectionOverride: ({ defaultCollection }) => {
        return {
          ...defaultCollection,
          admin: {
            hidden: false,
            group: 'Ecommerce',
          },
          // fields: [
          //   ...defaultCollection.fields,
          //   {
          //     name: 'test',
          //     type: 'select',
          //     options: ['option1', 'option2', 'option3'],
          //   },
          // ],
        }
      },
      supportedCountries: [
        { label: 'United States', value: 'US' },
        { label: 'Canada', value: 'CA' },
      ],
    },
    currencies: {
      defaultCurrency: 'CAD',
      supportedCurrencies: [
        {
          label: 'USD',
          symbol: '$',
          code: 'USD',
          decimals: 2,
        },
        {
          label: 'CAD',
          symbol: 'CAD',
          code: 'CAD',
          decimals: 3,
        },
      ],
    },
    customers: {
      slug: 'users',
    },
    inventory: {
      fieldName: 'quantity'
    },
    payments: {
      paymentMethods: [
        stripeAdapter({
          secretKey: process.env.STRIPE_SECRET_KEY!,
          publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
          webhookSecret: process.env.STRIPE_WEBHOOKS_SIGNING_SECRET!,
        }),
      ],
    },
    products: {
      productsCollectionOverride: ProductsCollection,
      variants: {
        variantsCollectionOverride: ({ defaultCollection }) => {
          return {
            ...defaultCollection,
            admin: {
              hidden: false,
              group: 'Ecommerce',
            },
          }
        },
      },
    },
  }),
]
