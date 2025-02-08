import type { UserModule } from '~/types'
import nProgress from 'nprogress'

export const install: UserModule = ({ isClient, router }) => {
  if (isClient) {
    router.beforeEach(() => {
      nProgress.start()
    })

    router.afterEach(() => {
      nProgress.done()
    })
  }
}
