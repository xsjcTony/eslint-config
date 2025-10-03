import type { Awaitable, TypedFlatConfigItem } from './types'
import { isPackageExists } from 'local-pkg'


/**
 * Combine array and non-array configs into a single array.
 */
export async function combine(
  ...configs: Awaitable<TypedFlatConfigItem | TypedFlatConfigItem[]>[]
): Promise<TypedFlatConfigItem[]> {
  // eslint-disable-next-line ts/await-thenable
  return (await Promise.all(configs)).flat()
}


export function toArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value]
}


export async function interopDefault<T>(module: Awaitable<T>): Promise<T extends { 'default': infer U } ? U : T> {
  const resolvedModule = await module
  return (resolvedModule as any).default ?? resolvedModule
}


export async function ensurePackages(packages: string[]): Promise<void> {
  if (process.env.CI || !process.stdout.isTTY)
    return

  const missingPackages = packages.filter(pkg => !isPackageExists(pkg))

  if (missingPackages.length === 0)
    return

  const prompt = await import('@clack/prompts')

  const result = await prompt.confirm({
    message: `${missingPackages.length === 1 ? 'Package is' : 'Packages are'} required for this config: ${missingPackages.join(', ')}. Do you want to install them?`,
  })

  if (result) {
    await import('@antfu/install-pkg')
      .then(async module => await module.installPackage(missingPackages, { dev: true }))
  }
}


export function renameRules<T>(rules: Record<string, T>, map: Record<string, string>): Record<string, T> {
  return Object.fromEntries(
    Object.entries(rules).map(([key, value]) => {
      for (const [from, to] of Object.entries(map)) {
        if (key.startsWith(`${from}/`))
          return [`${to}${key.slice(from.length)}`, value]
      }

      return [key, value]
    }),
  )
}
