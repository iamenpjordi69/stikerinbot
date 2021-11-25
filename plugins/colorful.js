
let handler = async (m, { conn, text }) => {
  if (!text) throw 'Send a text!'
  await conn.sendFile(m.chat, global.API('xteam', '/videomaker/colorful', {text}, 'APIKEY'), 'colorful.mp4', '', m)
}
handler.help = ['colorful']
handler.tags = ['nulis']

handler.command = /^colorful$/i

module.exports = handler
