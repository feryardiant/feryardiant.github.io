import nProgress from 'nprogress'
import type { UserModule } from '~/types'

export const install: UserModule = ({ isClient, router }) => {
  if (isClient) {
    router.beforeEach(() => { nProgress.start() })
    router.afterEach(() => { nProgress.done() })
  }
}
