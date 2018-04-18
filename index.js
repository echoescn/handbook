'use strict'

const fs = require('fs')
const simpleGit = require('simple-git')

setInterval(function () {
  upDataFile()
}, 1000 * 60 * 60 * 24) //时间不易太短

upDataFile()
function upDataFile() {
  const time = Date()
  fs.appendFile(__dirname + '/TIME.md', '#### 自动 commit，时间:' + time + '\r\n', err => {
    err ? console.error('缺少 TIME.md ') : console.log('TIME 文件追加成功，时间: ' + time)
    gitCommit(time)
  })
}

function gitCommit(time){
  simpleGit()
       .addConfig('user.name', 'ry-robot')
       .addConfig('user.email', 'echoescn@gmail.com')
       .add('./*')
       .commit('自动 commit，时间' + time)
       .push(['-u', 'origin', 'master'], (e) => {
          console.log('commit 成功，时间：' + time)
       })
}
