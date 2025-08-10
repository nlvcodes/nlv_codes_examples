import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    // allowRestrictedFileTypes: true,
    mimeTypes: ['image/jpeg'],
    admin: {
      components: {
        controls: ['/app/components/UploadControl.tsx#ExampleButton']
      }
    }
  },
}
