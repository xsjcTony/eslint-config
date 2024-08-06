const MINOR_PACKAGES = new Set([
  '@types/node',
])


module.exports = {
  format: 'group',
  interactive: true,
  target: (packageName) => {
    if (MINOR_PACKAGES.has(packageName))
      return 'minor'

    return 'latest'
  },
}
