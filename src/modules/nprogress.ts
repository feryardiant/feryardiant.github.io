import type { UserModule } from '~/types'
import nProgress from 'nprogress'

export const install: UserModule = ({ router }) => {
  if (!import.meta.env.SSR) {
    router.beforeEach(() => {
      nProgress.start()
    })

    router.afterEach(() => {
      nProgress.done()
    })
  }
}
