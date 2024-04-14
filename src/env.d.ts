/// <reference types="vite/client" />
/// <reference types="vite-plugin-pages/client" />
/// <reference types="vite-plugin-md/client" />
/// <reference types="vite-plugin-vue-layouts/client" />
/// <reference types="vue/ref-macros" />

interface ImportMetaEnv {
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
