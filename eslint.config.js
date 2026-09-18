'use strict'

import antfu from '@antfu/eslint-config'

export default antfu({}, {
  ignores: [
    '**/_drafts/**',
    '**/pages/**',
  ],
  languageOptions: {
    parserOptions: {
      project: true,
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
