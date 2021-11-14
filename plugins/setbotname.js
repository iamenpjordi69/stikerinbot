// NurNurz
let handler = async (m, { conn, text }) => {
  if (!text) throw `uhm.. where is the text?`
  try {
    await conn.updateProfileName(text)
    m.reply('Bot name changed Successfully!')
  } catch (e) {
    console.log(e)
    throw `Error`
  }
}
handler.help = ['setbotname <text>']
handler.tags = ['owner']
handler.command = /^(setbotname)$/i
handler.owner = true

module.exports = handler
