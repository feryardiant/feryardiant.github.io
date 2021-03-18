import nProgress from 'nprogress'

/**
 * @param {import('vite-ssg').ViteSSGContext} ctx
 */
export const install = ({ isClient, router }) => {
  if (isClient) {
    router.beforeEach(() => { nProgress.start() })
    router.afterEach(() => { nProgress.done() })
  }
}
