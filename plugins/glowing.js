
let handler = async (m, { conn, text }) => {
  if (!text) throw 'Send a text!'
  await conn.sendFile(m.chat, global.API('xteam', '/videomaker/retro', {text}, 'APIKEY'), 'glowing.mp4', '', m)
}
handler.help = ['glowing']
handler.tags = ['nulis']

handler.command = /^glowing$/i

module.exports = handler
