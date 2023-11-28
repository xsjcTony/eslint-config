import { existsSync } from 'node:fs'
import { isPackageExists } from 'local-pkg'
import {
  ignores,
  javascript,
  importConfig,
  playwright,
  react,
  typescript,
  unocss,
  vue
} from './configs'


import { combine, interopDefault } from './utils'
import type { Awaitable, FlatConfigItem, OptionsConfig, UserConfigItem } from './types'


const flatConfigProps: (keyof FlatConfigItem)[] = [
  'files',
  'ignores',
  'languageOptions',
  'linterOptions',
  'processor',
  'plugins',
  'rules',
  'settings'
]


const VUE_PACKAGES = [
  'vue',
  'nuxt',
  'vitepress',
  '@slidev/cli'
]


const REACT_PACKAGES = [
  'react',
  'react-dom',
  'react-native',
  'next'
]


/**
 * Construct an array of ESLint flat config items.
 */
export const defineConfig = async (
  options: OptionsConfig & FlatConfigItem = {},
  ...userConfigs: Awaitable<UserConfigItem | UserConfigItem[]>[]
): Promise<UserConfigItem[]> => {

  const {
    // eslint-disable-next-line ts/no-unused-vars
    isInEditor = !!((process.env.VSCODE_PID || process.env.JETBRAINS_IDE) && !process.env.CI),
    vue: enableVue = VUE_PACKAGES.some(i => isPackageExists(i)),
    react: enableReact = REACT_PACKAGES.some(i => isPackageExists(i)),
    typescript: enableTypescript = isPackageExists('typescript'),
    playwright: enablePlaywright = isPackageExists('@playwright/test'),
    unocss: enableUnocss = isPackageExists('unocss'),
    gitignore: enableGitignore = true,
    overrides = {},
    componentExtensions = []
  } = options


  const configs: Awaitable<FlatConfigItem[]>[] = []


  /**
   * Gitignore
   */
  if (enableGitignore) {
    if (typeof enableGitignore === 'boolean') {
      existsSync('.gitignore')
      && configs.push(interopDefault(import('eslint-config-flat-gitignore')).then(r => [r()]))
    } else {
      configs.push(interopDefault(import('eslint-config-flat-gitignore')).then(r => [r(enableGitignore)]))
    }
  }


  if (enableVue)
    componentExtensions.push('vue')


  /**
   * ESLintignore, Javascript, Import
   */
  configs.push(
    ignores(),
    javascript({ overrides: overrides.javascript }),
    importConfig({
      typescript: !!enableTypescript,
      vue: !!enableVue,
      overrides: {
        'import': overrides.import,
        importTypescript: overrides.importTypescript
      }
    })
  )


  /**
   * Typescript
   */
  if (enableTypescript) {
    configs.push(typescript({
      ...typeof enableTypescript !== 'boolean' && enableTypescript,
      componentExtensions,
      overrides: overrides.typescript
    }))
  }


  /**
   * Vue 3
   */
  if (enableVue) {
    configs.push(vue({
      ...typeof enableVue !== 'boolean' && enableVue,
      typescript: !!enableTypescript,
      overrides: {
        vue: overrides.vue,
        vueAccessibility: overrides.vueAccessibility
      }
    }))
  }


  /**
   * React 18
   */
  if (enableReact) {
    configs.push(react({
      ...typeof enableReact !== 'boolean' && enableReact,
      typescript: !!enableTypescript,
      overrides: {
        react: overrides.react,
        jsxA11y: overrides.jsxA11y
      }
    }))
  }


  /**
   * Playwright
   */
  if (enablePlaywright) {
    configs.push(playwright({
      overrides: overrides.playwright
    }))
  }


  /**
   * Unocss
   */
  if (enableUnocss) {
    configs.push(unocss({
      ...typeof enableUnocss !== 'boolean' && enableUnocss,
      overrides: overrides.unocss
    }))
  }


  /**
   * Flat config object
   */
  const fusedConfig = flatConfigProps.reduce<FlatConfigItem>((acc, key) => {
    if (key in options)
      acc[key] = options[key] as any
    return acc
  }, {})

  if (Object.keys(fusedConfig).length)
    configs.push([fusedConfig])


  return await combine(...configs, ...userConfigs)
}
