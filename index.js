#!/bin/env node
/**
 *
 * @author yutent<yutent.io@gmail.com>
 * @date 2022/10/10 15:17:36
 */

import fs from 'iofs'
import { resolve, join, dirname } from 'path'
import { writePackageJson, writeConfigFile, writeGitIgnore } from './lib/demo-config.js'
import { writeHtmlFile } from './lib/demo-html.js'
import { writeLogo } from './lib/logo.js'
import {
  writeMainJs,
  writeAppVue,
  writeHomeVue,
  writeAboutVue,
  writeHelloVue,
  writeRouter,
  writeStore
} from './lib/demo-js.js'

const root = dirname(import.meta.url.slice(7))
const { version } = JSON.parse(fs.cat(join(root, './package.json')))

let args = process.argv.slice(2)

function printHelp() {
  console.log('Usage: vue-live-cli {command} [arguments]')
  console.log('  ', 'vue-live-cli init', '初始化一个符合vue-live的vue项目')
  console.log('  ', 'vue-live-cli -h[--help]', '打印帮助信息')
  console.log()
  process.exit()
}

switch (args[0]) {
  case 'init':
    let dir = resolve('./')
    let isEmpty = fs.ls(dir).length === 0
    console.log(isEmpty)
    if (isEmpty) {
      fs.mkdir(join(dir, 'src'))

      writePackageJson(join(dir, 'package.json'))
      writeConfigFile(join(dir, 'vue.live.js'))
      writeGitIgnore(join(dir, '.gitignore'))

      writeHtmlFile(join(dir, 'index.html'))

      writeLogo(join(dir, 'src/assets/logo.svg'))

      writeMainJs(join(dir, 'src/main.js'))
      writeAppVue(join(dir, 'src/app.vue'))
      writeHomeVue(join(dir, 'src/views/home.vue'))
      writeAboutVue(join(dir, 'src/views/about.vue'))
      writeHelloVue(join(dir, 'src/components/hello.vue'))
      writeRouter(join(dir, 'src/router.js'))
      writeStore(join(dir, 'src/store.js'))

      console.log('初始化完成, 依次执行以下命令启动项目: ')
      console.log('npm i')
      console.log('npm start')
    } else {
      console.error('当前目录非空, 请切换到一个空目录再执行~~')
      process.exit()
    }
    break

  case '-v':
  case '--version':
    console.log('v' + version)
    break

  default:
    printHelp()
    break
}
