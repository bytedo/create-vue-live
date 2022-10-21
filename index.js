#!/bin/env node
/**
 *
 * @author yutent<yutent.io@gmail.com>
 * @date 2022/10/10 15:17:36
 */

import { red, cyan } from 'kolorist'
import prompts from 'prompts'
import fs from 'iofs'
import { resolve, join, dirname } from 'path'
import {
  writePackageJson,
  writeConfigFile,
  writeGitIgnore,
  writePrettierrc
} from './lib/demo-config.js'
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

const CURRENT_DIR = process.cwd()
const root = dirname(import.meta.url.slice(7))
const { version } = JSON.parse(fs.cat(join(root, './package.json')))

const DEFAULT_NAME = 'vue-live-app'

let args = process.argv.slice(2)
let targetDir = ''

function isEmpty(dir) {
  let list = fs.ls(dir)
  if (list && list.length) {
    return false
  }
  return true
}

function sleep(num = 1) {
  return new Promise(resolve => setTimeout(resolve, num * 1000))
}

function printHelp() {
  console.log('Usage: vue-live-cli {command} [arguments]')
  console.log('  ', 'vue-live-cli init', '初始化一个符合vue-live的vue项目')
  console.log('  ', 'vue-live-cli -h[--help]', '打印帮助信息')
  console.log()
  process.exit()
}

!(async function () {
  switch (args[0]) {
    case '-v':
    case '--version':
      console.log('v' + version)
      break

    case '-h':
    case '--help':
      printHelp()
      break

    default:
      let res = await prompts([
        {
          name: 'projectName',
          type: 'text',
          message: '项目名称(也是目录名, 只能为英文、数字、-):',
          initial: DEFAULT_NAME,
          validate: val => /^[a-zA-Z\d\-\.]+$/.test(val),
          onState: ({ value }) => (targetDir = join(CURRENT_DIR, value))
        },
        {
          name: 'shouldOverwrite',
          type: _ => (isEmpty(targetDir) ? null : 'toggle'),
          message: _ => `目录 ${cyan(targetDir)} 非空, 是否${red('删除')}目录下所有的文件?`,
          initial: false,
          active: '是',
          inactive: '否'
        },
        {
          name: 'confirmCheck',
          type: shouldOverwrite => {
            if (shouldOverwrite === false) {
              console.log(red('✖') + ' 操作取消~~')
              process.exit(1)
            }
            return null
          }
        }
      ])

      console.log()

      if (res.projectName === '.') {
        res.projectName = DEFAULT_NAME
      }

      console.log('指定的项目名为: %s', cyan(res.projectName))
      console.log('项目目录为: %s', cyan(targetDir))

      if (res.shouldOverwrite) {
        console.log(red('目录非空, 1s 后将清空目录~~'))
        await sleep(1)
        let list = fs.ls(targetDir)
        list.forEach(it => fs.rm(it, true))
      } else {
        console.log(red('程序将在 1s 后初始化项目~~'))
        await sleep(1)
      }

      console.log(cyan('\n初始化项目...'))

      fs.mkdir(join(targetDir, 'src'))

      console.log('[c---------]', '10%')

      writePackageJson(join(targetDir, 'package.json'), res.projectName)
      writeConfigFile(join(targetDir, 'vue.live.js'))
      writeGitIgnore(join(targetDir, '.gitignore'))
      writePrettierrc(join(targetDir, '.prettierrc.yaml'))

      console.log('[ooc-------]', '30%')

      writeHtmlFile(join(targetDir, 'index.html'))

      writeLogo(join(targetDir, 'src/assets/logo.svg'))
      fs.cp(join(root, 'lib/favicon.ico'), join(targetDir, 'src/favicon.ico'))

      console.log('[oooooc----]', '60%')

      writeMainJs(join(targetDir, 'src/main.js'))
      writeAppVue(join(targetDir, 'src/app.vue'))
      writeHomeVue(join(targetDir, 'src/views/home.vue'))
      writeAboutVue(join(targetDir, 'src/views/about.vue'))
      writeHelloVue(join(targetDir, 'src/components/hello.vue'))
      writeRouter(join(targetDir, 'src/router.js'))
      writeStore(join(targetDir, 'src/store.js'))

      console.log('[oooooooooo]', '100%')
      console.log(cyan('初始化完成, 可依次执行以下命令启动项目: '))
      console.log('npm i')
      console.log('npm start')

      break
  }
})()
