import { existsSync } from 'node:fs'
import gitignore from 'eslint-config-flat-gitignore'
import { isPackageExists } from 'local-pkg'
import { ignores, javascript, importConfig } from './configs'
import { typescript } from './configs/typescript'
import { vue } from './configs/vue'
import { combine } from './utils'
import type { ConfigItem, OptionsConfig } from './types'


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
  options: OptionsConfig = {},
  ...userConfigs: (ConfigItem | ConfigItem[])[]
): ConfigItem[] => {

  const {
    isInEditor = !!((process.env.VSCODE_PID || process.env.JETBRAINS_IDE) && !process.env.CI),
    vue: enableVue = VUE_PACKAGES.some(i => isPackageExists(i)),
    react: enableReact = REACT_PACKAGES.some(i => isPackageExists(i)),
    typescript: enableTypescript = isPackageExists('typescript'),
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
      overrides: overrides.import
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
      overrides: overrides.vue
    }))
  }


  /**
   * React 18
   */
  if (enableReact) {
    config.push(/* TODO: React */)
  }


  return combine(...configs, ...userConfigs)
}
