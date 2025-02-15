let fetch = require('node-fetch')
let handler = async (m, { conn, args, usedPrefix, command }) => {

  if (!args[0]) throw `uhm.. Send tiktok url?\n\nExample:\n${usedPrefix + command} https://vt.tiktok.com/yqyjPX/`
  if (!args[0].match(/tiktok/gi)) throw `Invalid URL!!`

  let res = await fetch(API('mel', '/tiktok', { url: args[0] }, 'apikey'))
  if (!res.ok) throw eror
  let json = await res.json()
  if (!json.status) throw json
  await m.reply(wait)
  await conn.sendFile(m.chat, json.result.link, '', `${json.result.caption}\n\n© MilfBot`, m)

}
handler.help = ['tiktok'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^(tiktok)$/i

handler.limit = true

module.exports = handler
