let handler = async (m, { conn }) => {
  if (!db.data.settings.nsfw) throw "NSFW mode is *OFF*";
  m.reply('Loading...')
  let res = `https://server-api-rey.herokuapp.com/api/nsfw/yuri?apikey=apirey`
  conn.sendFile(m.chat, res, 'milf.jpg', '© MilfBOT', m)
}
handler.help = ['milf']
handler.tags = ['anime']
handler.group = true
handler.command = /^(milf)$/i

module.exports = handler
