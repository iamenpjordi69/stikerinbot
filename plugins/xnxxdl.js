let fetch = require('node-fetch')

let handler = async (m, { conn, args }) => {
 if (!args[0]) throw 'Uhm..Send xnxx download URL?'
 let res = await fetch(API('Velgrynd', '/api/xnxxdl', { url: args[0] }))
 if (!res.ok) throw await res.text()
 let json = await res.json()
 let { title, image } = json.result
 m.reply(JSON.stringify(json.result, null, 2))
 conn.sendFile(m.chat, image, title, '', m)
}
handler.help = ['xnxxdl'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^xnxxdl$/i

handler.limit = true

module.exports = handler
