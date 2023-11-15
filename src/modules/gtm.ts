import { createGtm, useGtm } from '@gtm-support/vue-gtm'
import type { UserModule } from '~/types'

export const install: UserModule = ({ app, isClient, router, routes }) => {
  if (!isClient && !import.meta.env.VITE_GTM_ID)
    return

  const gtm = createGtm({
    id: import.meta.env.VITE_GTM_ID,
    vueRouter: router,
    debug: import.meta.env.DEV,
  })

  if (import.meta.env.DEV)
    console.log(routes) // eslint-disable-line no-console

  router.afterEach((to) => {
    useGtm()?.trackView(to.name as string, to.fullPath)
  })

  app.use(gtm)
}
