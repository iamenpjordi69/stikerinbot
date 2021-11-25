
let handler = async (m, { conn, text }) => {
  if (!text) throw 'Send a text!'
  await conn.sendFile(m.chat, global.API('xteam', '/videomaker/retro', {text}, 'APIKEY'), 'retro.mp4', '', m)
}
handler.help = ['retro']
handler.tags = ['nulis']

handler.command = /^retro$/i

module.exports = handler
