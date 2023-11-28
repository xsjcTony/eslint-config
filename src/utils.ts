import type { Awaitable, UserConfigItem } from './types'


/**
 * Combine array and non-array configs into a single array.
 */
export const combine = async (
  ...configs: Awaitable<UserConfigItem | UserConfigItem[]>[]
): Promise<UserConfigItem[]> =>
  (await Promise.all(configs)).flat()


export const renameRules = (rules: Record<string, any>, from: string, to: string): Record<string, any> =>
  Object.fromEntries(
    Object.entries(rules).map(([key, value]) => key.startsWith(from)
      ? [to + key.slice(from.length), value]
      : [key, value])
  )


export const toArray = <T>(value: T | T[]): T[] => Array.isArray(value) ? value : [value]


export const interopDefault = async <T>(m: Awaitable<T>): Promise<T extends { default: infer U } ? U : T> => {
  const module = await m
  return (module as any).default || module
}
