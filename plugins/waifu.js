let fetch = require('node-fetch')
let handler = async (m, { conn }) => {
  let res = await fetch('https://api.waifu.pics/sfw/waifu')
  if (!res.ok) throw eror
  let json = await res.json()
  if (!json.url) throw 'Error!'
  // conn.sendFile(m.chat, json.url, '', 'Istri kartun', m, 0, { thumbnail: Buffer.alloc(0) })
  await conn.sendButtonImg(m.chat, await(await fetch(json.url)).buffer(), 'Why is your girlfriend a cartoon?', '© MilfBOT', 'Next', '.waifu', m)
}
handler.help = ['waifu']
handler.tags = ['anime']
handler.command = /^(waifu)$/i

module.exports = handler
