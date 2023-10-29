import { existsSync } from 'node:fs'
import gitignore from 'eslint-config-flat-gitignore'
import { isPackageExists } from 'local-pkg'
import { ignores, javascript } from './configs'
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
  options: OptionsConfig & ConfigItem = {},
  ...userConfigs: (ConfigItem | ConfigItem[])[]
) => {

  const {
    isInEditor = !!((process.env.VSCODE_PID || process.env.JETBRAINS_IDE) && !process.env.CI),
    vue: enableVue = VUE_PACKAGES.some(i => isPackageExists(i)),
    react: enableReact = REACT_PACKAGES.some(i => isPackageExists(i)),
    typescript: enableTypeScript = isPackageExists('typescript'),
    gitignore: enableGitignore = true,
    overrides = {},
    componentExts = []
  } = options


  const configs: ConfigItem[][] = []


  if (enableGitignore) {
    if (typeof enableGitignore === 'boolean')
      existsSync('.gitignore') && configs.push([gitignore()])
    else
      configs.push([gitignore(enableGitignore)])
  }


  configs.push(
    ignores(),
    javascript({ overrides: overrides.javascript })
  )


  if (enableVue)
    componentExts.push('vue')


}
