/**
 * @param {import('vite-ssg').ViteSSGContext} ctx
 */
export const install = ({ router }) => {
  router.linkActiveClass = ''
  router.linkExactActiveClass = 'is-active'
}
