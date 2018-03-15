// import modules
const express = require('express')
const axios = require('axios')
const bodyParser = require('body-parser')

axios.defaults.baseURL = 'https://api.line.me/v2/bot'
axios.defaults.auth = {
  bearer: 'Channel Access Token' // ここは自分のtokenに書き換える
}

// create a new express server
const app = express()

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({
  extended: true
})) // for parsing application/x-www-form-urlencoded

app.post('/callback', (req, res) => {
  // 処理遅延の原因になるため先に返す
  res.send('OK')

  // LINE Serverへリクエスト
  const events = req.body.events
  for (event of events) {
    // 非同期実行
    axios.post('/message/reply', {
      replyToken: event.replyToken,
      messages: [{
        type: 'text',
        text: event.message.text // ここに指定した文字列がボットの発言になる
      }]
    }).then((response) => {
      console.log(JSON.stringify(response))
    }).catch((error) => {
      console.log(error)
    })
  }
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log('server starting on PORT:' + port)
})
