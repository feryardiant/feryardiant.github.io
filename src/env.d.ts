/// <reference types="@intlify/unplugin-vue-i18n/messages" />
/// <reference types="unplugin-vue-router/client" />
/// <reference types="vite/client" />
/// <reference types="vite-plugin-vue-layouts/client" />
/// <reference types="vue/ref-macros" />

interface ImportMetaEnv {
  SITE_AUTHOR_NAME: string
  SITE_AUTHOR_EMAIL: string
  SITE_NAME: string
  SITE_DESCRIPTION: string
  SITE_URL: string
  VITE_GTM_ID: string
  VITE_MEASUREMENT_ID: string
  VITE_PROJECT_ID: string
}

declare interface Window {
  // extend the window
}

declare module '*.vue' {
  import type { ComponentOptions } from 'vue'
  const Component: ComponentOptions
  export default Component
}

declare module '*.md' {
  import type { ComponentOptions } from 'vue'
  const Component: ComponentOptions
  export default Component
}
