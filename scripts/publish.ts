#!/usr/bin/env zx


import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { $ } from 'zx'


let version = process.argv[2]


if (!version)
  throw new Error('No tag specified')


if (version.startsWith('v'))
  version = version.slice(1)


const packagePath = fileURLToPath(new URL('../package.json', import.meta.url))
const pkg: { version: string } = JSON.parse(readFileSync(packagePath, 'utf8'))


if (pkg.version !== version)
  throw new Error(`Package version from tag "${version}" mismatches with the current version "${pkg.version}"`)


const releaseTag = version.includes('beta')
  ? 'beta'
  : version.includes('alpha')
    ? 'alpha'
    : version.includes('rc')
      ? 'rc'
      : null

console.log('--------------\n')
console.log(`Publishing version "${version}" with tag "${releaseTag ?? 'latest'}"`)
console.log('\n--------------')


releaseTag
  ? await $`pnpm publish --access public --no-git-checks --tag ${releaseTag}`
  : await $`pnpm publish --access public --no-git-checks`
