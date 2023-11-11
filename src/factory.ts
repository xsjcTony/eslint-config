import { existsSync } from 'node:fs'
import gitignore from 'eslint-config-flat-gitignore'
import { isPackageExists } from 'local-pkg'
import { ignores, javascript, importConfig } from './configs'
import { playwright } from './configs/playwright'
import { react } from './configs/react'
import { typescript } from './configs/typescript'
import { vue } from './configs/vue'
import { combine } from './utils'
import type { ConfigItem, OptionsConfig } from './types'


const flatConfigProps: (keyof ConfigItem)[] = [
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
export const aelita = (
  options: OptionsConfig & ConfigItem = {},
  ...userConfigs: (ConfigItem | ConfigItem[])[]
): ConfigItem[] => {

  const {
    isInEditor = !!((process.env.VSCODE_PID || process.env.JETBRAINS_IDE) && !process.env.CI),
    vue: enableVue = VUE_PACKAGES.some(i => isPackageExists(i)),
    react: enableReact = REACT_PACKAGES.some(i => isPackageExists(i)),
    typescript: enableTypescript = isPackageExists('typescript'),
    playwright: enablePlaywright = isPackageExists('@playwright/test'),
    gitignore: enableGitignore = true,
    overrides = {},
    componentExtensions = []
  } = options


  const configs: ConfigItem[][] = []


  /**
   * Gitignore
   */
  if (enableGitignore) {
    if (typeof enableGitignore === 'boolean')
      existsSync('.gitignore') && configs.push([gitignore()])
    else
      configs.push([gitignore(enableGitignore)])
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
        'import': overrides['import'],
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
   * Flat config object
   */
  const fusedConfig = flatConfigProps.reduce<ConfigItem>((acc, key) => {
    if (key in options)
      acc[key] = options[key] as any
    return acc
  }, {})

  if (Object.keys(fusedConfig).length)
    configs.push([fusedConfig])


  return combine(...configs, ...userConfigs)
}
