
let handler = async (m, { conn, text }) => {
  if (!text) throw 'Send a text!'
  await conn.sendFile(m.chat, global.API('xteam', '/videomaker/poly', {text}, 'APIKEY'), 'poly.mp4', '', m)
}
handler.help = ['poly']
handler.tags = ['nulis']

handler.command = /^poly$/i

module.exports = handler
