let handler = async (m, { conn }) => {
  ayg = global.db.data.users[m.sender]

  if(ayg.pasangan == ""){
    return conn.reply(m.chat,`You don't have a partner.`,m)
  }
  
  beb = global.db.data.users[global.db.data.users[m.sender].pasangan]

  if (typeof beb == "undefined"){
    conn.reply(m.chat,`Successfully broke up with @${global.db.data.users[m.sender].pasangan.split('@')[0]}`,m,{contextInfo: {
      mentionedJid: [global.db.data.users[m.sender].pasangan]
    }})
    ayg.pasangan = ""
  }

  if (m.sender == beb.pasangan){
    conn.reply(m.chat,`Successfully broke up with @${global.db.data.users[m.sender].pasangan.split('@')[0]}`,m,{contextInfo: {
      mentionedJid: [global.db.data.users[m.sender].pasangan]
    }})
    ayg.pasangan = ""
    beb.pasangan = ""
  }else {
    conn.reply(m.chat,`You don't have a partner.`,m)
  }
}
handler.help = ['breakup']
handler.tags = ['jadian']
handler.command = /^(breakup)$/i
handler.group = true
handler.fail = null
module.exports = handler
