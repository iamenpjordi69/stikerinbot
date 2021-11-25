
let handler = async (m, { conn, text }) => {
  if (!text) throw 'Send a text!'
  await conn.sendFile(m.chat, global.API('xteam', '/videomaker/bold', {text}, 'APIKEY'), 'bold.mp4', '', m)
}
handler.help = ['bold']
handler.tags = ['nulis']

handler.command = /^bold$/i

module.exports = handler
