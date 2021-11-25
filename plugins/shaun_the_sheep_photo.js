const uploadImage = require('../lib/uploadImage')
let handler = async (m, { conn, command, text}) => {
  let q = m.quoted ? m.quoted : m
 
  if (!text) throw 'Send some text to make its video!'
  await conn.sendFile(m.chat, global.API('xteam', '/videomaker/',+command {text}, 'APIKEY'), 'command.mp4', '', m)
}
handler.help = ['retro']
handler.tags = ['nulis']

handler.command = /^retro$/i

module.exports = handler
