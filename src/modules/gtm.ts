import type { UserModule } from '~/types'
import { createGtm } from '@gtm-support/vue-gtm'

export const install: UserModule = ({ app, router }) => {
  if (import.meta.env.SSR || import.meta.env.VITE_GTM_ID.length === 0)
    return

  const gtm = createGtm({
    id: import.meta.env.VITE_GTM_ID,
    vueRouter: router,
    debug: import.meta.env.DEV,
  })

  app.use(gtm)
}
