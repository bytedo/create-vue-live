import fs from 'iofs'

export function writeLogo(file) {
  fs.echo(
    '<svg viewBox="0 0 261.76 226.69" xmlns="http://www.w3.org/2000/svg"><path d="M161.096.001l-30.225 52.351L100.647.001H-.005l130.877 226.688L261.749.001z" fill="#41b883"/><path d="M161.096.001l-30.225 52.351L100.647.001H52.346l78.526 136.01L209.398.001z" fill="#34495e"/><path d="M36.21 192.639l160.921-74.805-81.778-5.063 119.519-67.69L49.06 126.138l88.8 2.712z" fill="rgb(252, 118, 97)"/></svg>',
    file
  )
}
