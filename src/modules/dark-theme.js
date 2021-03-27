/**
 * @param {import('vite-ssg').ViteSSGContext} ctx
 */
 export const install = ({ isClient, router }) => {
  if (isClient) {
    const { matches: prefersDark } = window.matchMedia?.('(prefers-color-scheme: dark)')
    const setting = localStorage.getItem('color-schema') || 'auto'
    if (setting === 'dark' || (prefersDark && setting !== 'light'))
      document.documentElement.classList.toggle('dark', true)
  }
}
