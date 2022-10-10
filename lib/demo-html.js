/**
 * {}
 * @author yutent<yutent.io@gmail.com>
 * @date 2022/10/10 17:00:29
 */

import fs from 'iofs'

export function writeHtmlFile(file) {
  fs.echo(
    `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
  <title>{{title}}</title>
  <meta name="keywords" content="{{keywords}}">
  <meta name="description" content="{{description}}">
  <link rel="stylesheet" href="//unpkg.com/@bytedo/wcui@1.0.6/dist/css/reset-basic.css">
  <script async src="//esm.tool/es-module-shims.wasm.js"></script>
  <script type="importmap">{{importmap}}</script>
</head>
<body>
  <div class="app noselect"></div>
  <script src="main.js"></script>
</body>
</html>
`,
    file
  )
}
