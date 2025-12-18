// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node'
import {loadEnv} from 'payload/node'

loadEnv()

// https://astro.build/config
export default defineConfig({
    output: 'server',
    adapter: node({
        mode: 'standalone'
    })
});
