let handler = async (m, { conn, text }) => {
  if (global.db.data.users[m.sender].pasangan == "") return conn.reply(m.chat, `You're not shooting anyone!`, m)
  if (global.db.data.users[global.db.data.users[m.sender].pasangan].pasangan == m.sender) return conn.reply(m.chat, `You have been dating @${global.db.data.users[m.sender].pasangan.split('@')[0]}`, m, {contextInfo: {
    mentionedJid: [global.db.data.users[m.sender].pasangan]
  }})
  conn.reply(m.chat, `You've made it up @${global.db.data.users[m.sender].pasangan.split('@')[0]} because he didn't give an answer accepted or rejected`, m, {contextInfo: {
    mentionedJid: [global.db.data.users[m.sender].pasangan]
  }})
  global.db.data.users[m.sender].pasangan = ""
}
handler.help = ['sincere']
handler.tags = ['jadian']
handler.command = /^(sincere)$/i
handler.mods = false
handler.premium = false
handler.group = true
handler.fail = null
module.exports = handler
