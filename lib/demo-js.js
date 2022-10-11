/**
 * {}
 * @author yutent<yutent.io@gmail.com>
 * @date 2022/10/10 17:00:29
 */

import fs from 'iofs'

export function writeMainJs(file) {
  fs.echo(
    `
import { createApp } from 'vue'
import App from './app.vue'

import router from './router'
import store from './store'
    
const app = createApp(App)

app.use(router).use(store).mount('.app')
    
`,
    file
  )
}

export function writeRouter(file) {
  fs.echo(
    `
import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/home.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/about.vue')
    }
  ]
})

export default router
    
    
`,
    file
  )
}

export function writeStore(file) {
  fs.echo(
    `
import { reactive } from 'vue'

const store = reactive({
  foo: 'bar',
  version: '0.0.5'
})

export default function (app) {
  app.config.globalProperties.$store = store
}
`,
    file
  )
}

export function writeAppVue(file) {
  fs.echo(
    `
<template>
  <header>
    <img alt="Vue logo" class="logo" src="/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <Hello msg="It works!!!" />

      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link>
      </nav>
    </div>
  </header>

  <router-view />
</template>

<script>
import Hello from './components/hello.vue'

export default {
  components: { Hello }
}
</script>

<style lang="scss">
.app {
  padding: 16px;
}

header {
  display: flex;
  flex-direction: column;
  align-items: center;
}

a {
  color: var(--color-teal-1);
  transition: 0.2s;
}

a:hover {
  color: var(--color-teal-3);
}

nav {
  margin-top: 32px;
  display: flex;
  justify-content: center;

  a {
    margin: 0 16px;
  }
}

main {
  margin: 32px;
  text-align: center;
}
</style>
  
    
`,
    file
  )
}

export function writeHelloVue(file) {
  fs.echo(
    `
<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      你已经成功运行了一个项目, 项目基于
      <a href="//github.com/bytedo/vue-live" target="_blank">Vue-live</a> +
      <a href="//vuejs.org" target="_blank">Vue 3</a>.
    </h3>
  </div>
</template>

<script>
export default {
  props: {
    msg: String
  }
}
</script>

<style>
h1 {
  font-size: 52px;
}

h3 {
  font-size: 1.2rem;
  font-weight: normal;
}

.green {
  font-family: 'Courier New', Courier, monospace;
  color: var(--color-blue-1);
}

.greetings {
  text-align: center;
}
</style>
   
`,
    file
  )
}

export function writeHomeVue(file) {
  fs.echo(
    `
<script>
export default {
  data(){
    return {
      content: '欢迎访问~~ 这是首页'
    }
  }
}
</script>

<template>
  <main>
    <h1>{{content}}</h1>
  </main>
</template>
    
`,
    file
  )
}

export function writeAboutVue(file) {
  fs.echo(
    `
<script>
export default {
  data(){
    return {
      content: '这是关于我们页面'
    }
  }
}
</script>

<template>
  <main>
    <h1>{{content}}</h1>
    <cite>当前vue-live版本: v{{$store.version}}</cite>
  </main>
</template>
    
`,
    file
  )
}
