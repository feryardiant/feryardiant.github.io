import vueGtm from '@gtm-support/vue-gtm'

/**
 * @param {import('vite-ssg').ViteSSGContext} ctx
 */
export const install = ({ app, isClient, routes }) => {
  if (isClient) {
    app.use(vueGtm, {
      id: import.meta.env.VITE_GTM_KEY,
      routes
    })
  }
}
