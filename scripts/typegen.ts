import * as fs from 'node:fs/promises'
import { builtinRules } from 'eslint/use-at-your-own-risk'
import { flatConfigsToRulesDTS } from 'eslint-typegen/core'
import {
  combine,
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
} from '../src'


const configs = await combine(
  {
    plugins: {
      '': {
        // eslint-disable-next-line ts/no-deprecated
        rules: Object.fromEntries(builtinRules.entries()),
      },
    },
  },
  javascript(),
  unicorn(),
  node(),
  importConfig(),
  typescript(),
  stylistic(),
  vue(),
  react(),
  next(),
  playwright(),
  unocss(),
  vitest(),
  tanstackQuery(),
  tanstackRouter(),
)


const configNames = configs.map(i => i.name).filter(Boolean) as string[]


let dts = await flatConfigsToRulesDTS(configs, {
  includeAugmentation: false,
})

dts += `
// Names of all the configs
export type ConfigNames = ${configNames.map(i => `'${i}'`).join(' | ')}
`


await fs.writeFile('src/types/typegen.d.ts', dts)
