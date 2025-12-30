import { type CollectionConfig, type FilterOptionsProps, slugField, type Where } from 'payload'
import type {Page} from '@/payload-types'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    slugField(),
    {
      name: 'title',
      type: 'text',
      required: true
    },
    {
      type: 'relationship',
      relationTo: 'brands',
      name: 'brand',
    },
    {
      type: 'relationship',
      relationTo: ['products', 'software'],
      name: 'product',
      admin: {
        condition: (_, siblingData) => !!siblingData.brand
      },
      filterOptions: ({siblingData, relationTo}: FilterOptionsProps<Page>): Where => {
        const pageData = siblingData as Page
        const brand = {equals: pageData.brand}
        if (relationTo === 'software') {
          return {
            brand,
            isDiscontinued: {equals: false}
          }
        }
        if (relationTo === 'products') {
          return {
            brand,
            stock: {greater_than: 0}
          }
        }
        return {}
      }
    },
    {
      type: 'group',
      name: 'softwareOptions',
      admin: {
        condition: (_, siblingData) => siblingData.product?.relationTo === 'software'
      },
      fields: [
        {type: 'number', name: 'price'},
        {
          type: 'textarea',
          name: 'systemRequirements',
          admin: {
            rows: 3
          }
        },
        {
          type: 'select',
          name: 'type',
          options: [
            {label: 'DAW', value: 'daw'},
            {label: 'Synth', value: 'synth'},
            {label: 'Pitch Correction', value: 'pitchCorrection'}
          ]
        }
      ]
    },
    {
      type: 'group',
      name: 'instrumentOptions',
      admin: {
        condition: (_, siblingData) => siblingData.product?.relationTo === 'products'
      },
      fields: [
        {type: 'number', name: 'price'},
        {
          name: 'type',
          type: 'select',
          options: [
            {label: 'Guitar', value: 'guitar'},
            {label: 'Bass', value: 'bass'},
            {label: 'Drums', value: 'drums'},
            {label: 'Electronic Instrument', value: 'electronicInstrument'}
          ]
        },
        {
          type: 'number',
          name: 'strings',
          admin: {
            condition: (_, siblingData) => siblingData.type === 'guitar' || siblingData.type === 'bass'
          }
        }
      ]
    }
  ]
}
