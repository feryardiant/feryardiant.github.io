export {}

declare module 'vue-router' {
  interface RouteMeta {
    layout?: string
    locale?: 'id' | 'en',
    title?: string
    description?: string
    frontmatter?: any
  }
}
