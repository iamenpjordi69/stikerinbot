let handler = async (m, { conn, text }) => {
	if(isNaN(text)) {
  	var number = text.split`@`[1]
  } else if(!isNaN(text)) {
  	var number = text
  }

  const format = num => {
    const n = String(num),
          p = n.indexOf('.')
    return n.replace(
        /\d(?=(?:\d{3})+(?:\.|$))/g,
        (m, i) => p < 0 || i < p ? `${m},` : m
    )
  }

  if(!text && !m.quoted) return conn.reply(m.chat, `Give number, tag or reply to target message.`, m)
  // let exists = await conn.isOnWhatsApp(number)
  // if (exists) return conn.reply(m.chat, `*Nomor target tidak terdaftar di WhatsApp*`, m)
  if(isNaN(number)) return conn.reply(m.chat, `The number you entered is not wrong!`, m)
  if(number.length > 15) return conn.reply(m.chat, `Wrong Format!`, m)
  try {
		if(text) {
			var user = number + '@s.whatsapp.net'
		} else if(m.quoted.sender) {
			var user = m.quoted.sender
		} else if(m.mentionedJid) {
  		  var user = number + '@s.whatsapp.net'
			}  
		} catch (e) {
  } finally {
    let groupMetadata = m.isGroup ? await conn.groupMetadata(m.chat) : {}
    let participants = m.isGroup ? groupMetadata.participants : []
    let users = m.isGroup ? participants.find(u => u.jid == user) : {}
    if(!users) return conn.reply(m.chat, `Target or Number not found, may have left or not a member of this group.`, m)
    if(user === m.sender) return conn.reply(m.chat, `Can't date myself!`, m)
    if(user === conn.user.jid) return conn.reply(m.chat, `Can't date me t_t`, m)
    
    if(global.db.data.users[user].pasangan != m.sender){
      conn.reply(m.chat,`Excuse ME @${user.split('@')[0]} not shooting you`,m,{contextInfo: {
        mentionedJid: [user]
      }})
    }else{
      global.db.data.users[m.sender].pasangan = user
      conn.reply(m.chat,`Congratulations, you are officially dating @${user.split('@')[0]}\n\nMay it last forever and always be happy @${user.split('@')[0]} 💓 @${m.sender.split('@')[0]} 🥳🥳🥳`,m,{contextInfo: {
        mentionedJid: [m.sender,user]
      }})
    }
	}	
}
handler.help = ['terima @tag']
handler.tags = ['jadian']
handler.command = /^(terima)$/i
handler.group = true
handler.limit = false
handler.fail = null
module.exports = handler
