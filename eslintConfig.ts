import { defineConfig } from '@aelita-dev/eslint-config'


export default defineConfig(
  {
    typescript: {
      projectType: 'lib',
    },
    'import': {
      ruleOptions: {
        order: {
          typeImportsFirst: true,
        },
      },
    },
  },
)
