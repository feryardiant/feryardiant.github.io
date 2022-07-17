import dayjs, { localizedFormat } from 'dayjs'

/**
 * @param {import('vite-ssg').ViteSSGContext} ctx
 */
export const install = ({ isClient }) => {
  if (isClient) {
    dayjs.extend(localizedFormat)
  }
}
