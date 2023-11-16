import { defineConfig } from 'vitepress'


export default defineConfig({
  outDir: './dist',
  srcDir: './src',

  lastUpdated: true,
  lang: 'en-US',
  appearance: 'dark',
  title: `Aelita's ESLint Preset`,
  titleTemplate: `:title | Aelita's ESLint Preset`,
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo-with-shadow.svg' }]
  ],
  description: "Aelita's ESLint config preset",
  themeConfig: {
    logo: '/logo.svg',

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
