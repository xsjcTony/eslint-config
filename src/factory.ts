import type { Awaitable, ConfigNames, OptionsConfig, TypedFlatConfigItem } from './types'
import type { Linter } from 'eslint'
import { existsSync } from 'node:fs'
import { FlatConfigComposer } from 'eslint-flat-config-utils'
import { isPackageExists } from 'local-pkg'
import {
  ignores,
  importConfig,
  javascript,
  next,
  node,
  playwright,
  react,
  stylistic,
  tanstackQuery,
  tanstackRouter,
  typescript,
  unicorn,
  unocss,
  vitest,
  vue,
} from './configs'
import { resolveStylisticConfig } from './configs/stylistic'
import { interopDefault } from './utils'


const flatConfigProps: (keyof TypedFlatConfigItem)[] = [
  'name',
  'files',
  'ignores',
  'languageOptions',
  'linterOptions',
  'processor',
  'plugins',
  'rules',
  'settings',
]


const VUE_PACKAGES = [
  'vue',
  'nuxt',
  'vitepress',
  '@slidev/cli',
]


const REACT_PACKAGES = [
  'react',
  'react-dom',
  'react-native',
  'next',
]


export const DEFAULT_PLUGIN_RENAMING_MAP = {
  '@typescript-eslint': 'ts',
  '@stylistic': 'style',
  '@stylistic/js': 'styleJs',
  'import-x': 'import',
  'vuejs-accessibility': 'vue-a11y',
  '@next/next': 'next',
  n: 'node',
}


/**
 * Construct an array of ESLint flat config items.
 *
 * @param {OptionsConfig & TypedFlatConfigItem} options The options for generating the ESLint configurations.
 * @param {Awaitable<TypedFlatConfigItem | TypedFlatConfigItem[] | FlatConfigComposer<any, any> | Linter.Config[]>[]} userConfigs The user configurations to be merged with the generated configurations.
 *
 * @returns {FlatConfigComposer<TypedFlatConfigItem, ConfigNames>} The merged ESLint configurations.
 */
export async function defineConfig(
  options: OptionsConfig & TypedFlatConfigItem = {},
  ...userConfigs: Awaitable<TypedFlatConfigItem | TypedFlatConfigItem[] | FlatConfigComposer<any, any> | Linter.Config[]>[]
): Promise<FlatConfigComposer<TypedFlatConfigItem, ConfigNames>> {

  const {
    componentExts = [],
    isInEditor = !!(
      (process.env.VSCODE_PID || process.env.VSCODE_CWD || process.env.JETBRAINS_IDE || process.env.VIM)
      && !process.env.CI
    ),
    autoRenamePlugins = true,
    gitignore: enableGitignore = true,
    javascript: javascriptOptions = {},
    unicorn: unicornOptions = {},
    node: nodeOptions = {},
    typescript: enableTypescript = isPackageExists('typescript'),
    'import': enableImport = true,
    stylistic: _stylistic = true,
    vue: enableVue = VUE_PACKAGES.some(pkg => isPackageExists(pkg)),
    react: enableReact = REACT_PACKAGES.some(pkg => isPackageExists(pkg)),
    next: enableNext = isPackageExists('next'),
    playwright: enablePlaywright = isPackageExists('@playwright/test'),
    unocss: enableUnocss = isPackageExists('unocss'),
    vitest: enableVitest = isPackageExists('vitest'),
    tanstackQuery: enableTanStackQuery = isPackageExists('@tanstack/react-query'),
    tanstackRouter: enableTanStackRouter = isPackageExists('@tanstack/react-router'),
  } = options


  const stylisticOptions = resolveStylisticConfig(_stylistic)


  if (enableVue)
    componentExts.push('vue')


  /**
   * ESLintignore, JavaScript, Import
   */
  const configs: Awaitable<TypedFlatConfigItem[]>[] = [
    ignores(),
    javascript({
      isInEditor,
      ...javascriptOptions,
    }),
    unicorn({
      typescript: !!enableTypescript,
      ...unicornOptions,
    }),
    node(nodeOptions),
  ]


  /**
   * Gitignore
   */
  if (enableGitignore) {
    if (typeof enableGitignore === 'boolean') {
      existsSync('.gitignore')
      && configs.push(interopDefault(import('eslint-config-flat-gitignore')).then(r => [r()]))
    } else { configs.push(interopDefault(import('eslint-config-flat-gitignore')).then(r => [r(enableGitignore)])) }
  }


  /**
   * Import
   */
  if (enableImport) {
    configs.push(
      importConfig({
        typescript: !!enableTypescript,
        vue: !!enableVue,
        stylistic: !!stylisticOptions,
        ...typeof enableImport !== 'boolean' && enableImport,
      }),
    )
  }


  /**
   * TypeScript
   */
  if (enableTypescript) {
    configs.push(
      typescript({
        componentExts,
        ...typeof enableTypescript !== 'boolean' && enableTypescript,
      }),
    )
  }


  /**
   * Stylistic
   */
  if (stylisticOptions) {
    configs.push(
      stylistic({
        ...stylisticOptions,
        ...typeof _stylistic === 'object' && { overrides: _stylistic.overrides },
      }),
    )
  }


  /**
   * Vue 3
   */
  if (enableVue) {
    configs.push(
      vue({
        typescript: !!enableTypescript,
        stylistic: stylisticOptions,
        ...typeof enableVue !== 'boolean' && enableVue,
      }),
    )
  }


  /**
   * React 18
   */
  if (enableReact) {
    configs.push(
      react({
        typescript: !!enableTypescript,
        next: !!enableNext,
        ...typeof enableReact !== 'boolean' && enableReact,
      }),
    )
  }


  /**
   * Next.js 14
   */
  if (enableNext) {
    configs.push(
      next(typeof enableNext === 'boolean' ? {} : enableNext),
    )
  }


  /**
   * Playwright
   */
  if (enablePlaywright) {
    configs.push(
      playwright(typeof enablePlaywright === 'boolean' ? {} : enablePlaywright),
    )
  }


  /**
   * Unocss
   */
  if (enableUnocss) {
    configs.push(
      unocss(typeof enableUnocss === 'boolean' ? {} : enableUnocss),
    )
  }


  /**
   * Vitest
   */
  if (enableVitest) {
    configs.push(
      vitest({
        isInEditor,
        ...typeof enableVitest !== 'boolean' && enableVitest,
      }),
    )
  }


  /**
   * TanStack Query
   */
  if (enableTanStackQuery) {
    configs.push(
      tanstackQuery(typeof enableTanStackQuery === 'boolean' ? {} : enableTanStackQuery),
    )
  }


  /**
   * TanStack Router
   */
  if (enableTanStackRouter) {
    configs.push(
      tanstackRouter(typeof enableTanStackRouter === 'boolean' ? {} : enableTanStackRouter),
    )
  }


  /**
   * Flat config object
   */
  const fusedConfig = flatConfigProps.reduce<TypedFlatConfigItem>((acc, key) => {
    if (key in options)
      acc[key] = options[key] as any
    return acc
  }, {})

  if (Object.keys(fusedConfig).length)
    configs.push([fusedConfig])


  let composer = new FlatConfigComposer<TypedFlatConfigItem, ConfigNames>()

  composer = composer.append(...configs, ...userConfigs as any)

  if (autoRenamePlugins)
    composer = composer.renamePlugins(DEFAULT_PLUGIN_RENAMING_MAP)


  return await composer
}
