import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import nextPlugin from '@next/eslint-plugin-next'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['.next', 'out']),
  ...tseslint.config(
    {
      files: ['**/*.{js,jsx,ts,tsx}'],
      extends: [
        js.configs.recommended,
        ...tseslint.configs.recommended,
      ],
      plugins: {
        '@next/next': nextPlugin,
        'react-hooks': reactHooks,
      },
      rules: {
        ...reactHooks.configs.recommended.rules,
        ...nextPlugin.configs.recommended.rules,
        ...nextPlugin.configs['core-web-vitals'].rules,
        'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      },
      languageOptions: {
        ecmaVersion: 2020,
        globals: globals.browser,
      },
    }
  )
])
