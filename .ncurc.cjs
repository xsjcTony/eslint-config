const MINOR_PACKAGES = new Set([
  '@types/node',
])


module.exports = {
  format: 'group',
  interactive: true,
  peer: true,
  dep: ['prod', 'dev', 'optional', 'packageManager', 'peer'],
  target: (packageName) => {
    if (MINOR_PACKAGES.has(packageName))
      return 'minor'

    return 'latest'
  },
}
