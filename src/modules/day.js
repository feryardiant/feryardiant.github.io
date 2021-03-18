import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'

/**
 * @param {import('vite-ssg').ViteSSGContext} ctx
 */
export const install = () => {
  dayjs.extend(localizedFormat)
}
