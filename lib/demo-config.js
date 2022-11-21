/**
 * {}
 * @author yutent<yutent.io@gmail.com>
 * @date 2022/10/10 16:49:07
 */

import fs from 'iofs'

export function writePackageJson(file, name) {
  fs.echo(
    JSON.stringify(
      {
        name: name || 'vue-live-app',
        type: 'module',
        scripts: {
          start: 'vue-live dev',
          build: 'vue-live build'
        },
        dependencies: {
          '@bytedo/vue-live': '^0.0.11'
        }
      },
      ' ',
      2
    ),
    file
  )
}

export function writeConfigFile(file) {
  fs.echo(
    `
import { resolve } from 'path'

export default {
  devServer: {
    port: 8080,
    domain: '',
    https: false,
    ssl: {
      key: '',
      cert: '',
      // ca: ''
    }
  },
  pages: {
    // 如果多页应用, 则这里写传入多个值即可(注意不是数组格式)
    // 这里的key值, 将是最终的页面的名称
    index: {
      // 这里的resolve可将相对路径转为绝对路径
      // 如果传入的路径已经是绝对路径的, 可不需要resolve
      entry: resolve('./src/main.js'),
      title: 'vue-live 应用示例'
    }
  },
  // 以下cdn地址, 可自行修改为适合的
  // 有用到其他的库, 可以手动添加,
  // 也可以在页面中直接引入完整的路径, 而不必须在这里声明
  imports: {
    vue: '//unpkg.com/vue@3.2.40/dist/vue.esm-browser.prod.js',
    'vue-router': '//unpkg.com/vue-router@4.1.5/dist/vue-router.esm-browser.js',
    // 这个库被vue-router依赖, 可以注释掉vue-router代码中的 @vue/devtools-api 的引入
    // 以达到减少不必须的体积的效果
    '@vue/devtools-api': '//unpkg.com/@vue/devtools-api@6.4.4/lib/esm/index.js',
    fetch: '//unpkg.com/@bytedo/fetch@2.1.1/dist/next.js'
  }
}

`,
    file
  )
}

export function writeGitIgnore(file) {
  fs.echo(
    `
node_modules

*.sublime-project
*.sublime-workspace
package-lock.json

._*

.Spotlight-V100
.Trashes
.DS_Store
.AppleDouble
.LSOverride

`,
    file
  )
}

export function writePrettierrc(file) {
  fs.echo(
    `
jsxBracketSameLine: true
jsxSingleQuote: true
semi: false
singleQuote: true
printWidth: 100
useTabs: false
tabWidth: 2
trailingComma: none
bracketSpacing: true
arrowParens: avoid
`,
    file
  )
}
