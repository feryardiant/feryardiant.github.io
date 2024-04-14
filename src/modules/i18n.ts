import { createI18n } from 'vue-i18n'
import messages from '@intlify/unplugin-vue-i18n/messages'
import type { UserModule } from '~/types'

export const install: UserModule = ({ app }) => {
  const i18n = createI18n({
    legacy: false,
    locale: 'en',
    fallbackLocale: 'id',
    messages,
  })

  app.use(i18n)
}
