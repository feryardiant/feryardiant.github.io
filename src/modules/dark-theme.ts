import type { UserModule } from '~/types'

export const install: UserModule = ({ isClient }) => {
  if (isClient) {
    const { matches: prefersDark } = window.matchMedia?.('(prefers-color-scheme: dark)')
    const setting = localStorage.getItem('color-schema') || 'auto'
    if (setting === 'dark' || (prefersDark && setting !== 'light'))
      document.documentElement.classList.toggle('dark', true)
  }
}
