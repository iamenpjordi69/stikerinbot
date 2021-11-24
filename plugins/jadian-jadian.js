/*//////////////////////////////////

    Di Upload Oleh Fokus Dot Id 

/*////////////////////////////////*/

let handler = async (m, { conn, usedPrefix, text }) => {
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

  if(!text && !m.quoted) return conn.reply(m.chat, `Enter number, target tag or reply to target message`, m)
  // let exists = await conn.isOnWhatsApp(number)
  // if (exists) return conn.reply(m.chat, `*Nomor target tidak terdaftar di WhatsApp*`, m)
  if(isNaN(number)) return conn.reply(m.chat, `_*Invalid number.*_`, m)
  if(number.length > 15) return conn.reply(m.chat, `*_Invalid Format.*_`, m)
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
    if(!users) return conn.reply(m.chat, `*_Target or Number not found, may have left or not a member of this group.*_`, m)
    if(user === m.sender) return conn.reply(m.chat, `_*Can't date myself.*_`, m)
    if(user === conn.user.jid) return conn.reply(m.chat, `_*Can't date me. :')*_`, m)

    if (typeof global.db.data.users[user] == "undefined") return m.reply("_*The person you tagged is not registered in the database.*_")
    
    if(global.db.data.users[m.sender].pasangan != "" && global.db.data.users[global.db.data.users[m.sender].pasangan].pasangan == m.sender && global.db.data.users[m.sender].pasangan != user){
      conn.reply(m.chat,`You're already dating @${global.db.data.users[m.sender].pasangan.split('@')[0]}\n\nPlease break up first (type .breakup to breakup) to shoot @${user.split('@')[0]}\n\nBtw very less loyal!`,m,{contextInfo: {
        mentionedJid: [user,global.db.data.users[m.sender].pasangan]
      }})
    }else if(global.db.data.users[user].pasangan != ""){
      var pacar = global.db.data.users[user].pasangan
      if (global.db.data.users[pacar].pasangan == user){
        if (m.sender == pacar && global.db.data.users[m.sender].pasangan == user) return conn.reply(m.chat,`You're already dating @${beb.split('@')[0]}`,m,{contextInfo: {
          mentionedJid: [beb]
        }})
        conn.reply(m.chat,`Excuse ME, @${user.split('@')[0]} are already dating @${pacar.split('@')[0]}\nPlease find another partner!`,m,{contextInfo: {
          mentionedJid: [user,pacar]
        }})
      }else{
        global.db.data.users[m.sender].pasangan = user
        conn.reply(m.chat,`You just invited @${user.split('@')[0]} for dating\n\nPlease wait for his answer!\n\nType *${usedPrefix}accept @user* for accepting\n*${usedPrefix}reject @user to refuse*`,m,{contextInfo: {
          mentionedJid: [user]
        }})
      }
    }else if (global.db.data.users[user].pasangan == m.sender){
      global.db.data.users[m.sender].pasangan = user
      conn.reply(m.chat,`Congratulations, you are officially dating @${user.split('@')[0]}\n\nMay it last forever and always be happy 🥳🥳🥳`,m,{contextInfo: {
        mentionedJid: [user]
      }})
    }else {
      global.db.data.users[m.sender].pasangan = user
      conn.reply(m.chat,`You just invited @${user.split('@')[0]} for dating\n\nPlease wait for his answer!\n\nType *${usedPrefix}accept @user* to accept\n*${usedPrefix}reject @user to reject*`,m,{contextInfo: {
        mentionedJid: [user]
      }})
    }
	}	
}
handler.help = ['shoot @tag']
handler.tags = ['jadian']
handler.command = /^(shoot)$/i
handler.group = true
handler.limit = false
handler.fail = null
module.exports = handler
