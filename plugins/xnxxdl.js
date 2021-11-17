let fetch = require('node-fetch')

let handler = async (m, { conn, args }) => {
 if (!args[0]) throw 'Uhm..Send xnxx download URL?'
 let res = await fetch(API('Velgrynd', '/api/xnxxdl', { url: args[0] }))
 if (!res.ok) throw await res.text()
 let json = await res.json()
 let { title, high } = json.result
 m.reply(JSON.stringify(json.result, null, 2))
 for (let { low, type } of json) {
      conn.sendFile(m.chat, low, + (type == 'image' ? '.jpg' : '.mp4'), '© MilfBOT', m)
    }
}
handler.help = ['xnxxdl'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^xnxxdl$/i
handler.premium = true

handler.limit = true

module.exports = handler
