// NurNurz
let handler = async (m, { conn, text }) => {
  if (!text) throw `uhm.. where is the text?`
  try {
    await conn.setStatus(text)
    m.reply('Bot bio set successfully!')
  } catch (e) {
    console.log(e)
    throw `Eror`
  }
}
handler.help = ['setbotbio <text>']
handler.tags = ['owner']
handler.command = /^(setbotbio)$/i
handler.owner = true

module.exports = handler
