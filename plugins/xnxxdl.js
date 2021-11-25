let fetch = require('node-fetch')

let handler = async (m, { conn, args }) => {
 if (!args[0]) throw 'Uhm..Send xnxx download URL?'
 let res = await fetch(API('Velgrynd', '/api/xnxxdl', { url: args[0] }))
 if (!res.ok) throw await res.text()
 let json = await res.json()
 let { title, image, low, high, info } = json.result
 let xnxxinfo = `*Title:* ${title}
 *Info:* ${info}
 *Download:* 
  Low: ${low}
  High: ${high}
//m.reply(JSON.stringify(json.result, null, 2))
 conn.sendFile(m.chat, 'low' , 'xnxx.mp4', '', m)
}
handler.help = ['xnxxdl'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^xnxxdl$/i

handler.limit = true

module.exports = handler
