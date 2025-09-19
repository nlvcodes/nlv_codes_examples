import {GlobalConfig} from 'payload'

export const Settings: GlobalConfig = {
  slug: 'settings',
  fields: [
    {
      name: 'lightModeIcon',
      type: 'upload',
      relationTo: 'media'
    },
    {
      name: 'lightModeLogo',
      type: 'upload',
      relationTo: 'media'
    },
    {
      name: 'darkModeIcon',
      type: 'upload',
      relationTo: 'media'
    },
    {
      name: 'darkModeLogo',
      type: 'upload',
      relationTo: 'media'
    },
  ]
}