import { GlobalConfig } from 'payload'

export const YouTubeSettings: GlobalConfig = {
  slug: 'youtube-settings',
  fields: [
    { type: 'text', name: 'channelId' },
    { type: 'text', name: 'refreshToken' },
    { type: 'date', name: 'lastAuthorized' },
  ],
}