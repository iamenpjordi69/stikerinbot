// Pngocok handal

let fetch = require('node-fetch')
let handler = async (m, { text }) => {
  let res = await fetch(global.API('https://some-random-api.ml/chatbot?key=kgI6NXWhe9Qev6IV4mWNsBeOq, {
    message: text
  }))
  if (!res.ok) throw await res.text()
  let json = await res.json()
  if (!json.thumbnail.genius) throw json
  conn.reply(m.chat, `*${json.response}* `, m)
}
handler.help = ['chatbot'].map(v => v + ' <text>')
handler.tags = ['fun']
handler.command = /^(c|chat)$/i

module.exports = handler
