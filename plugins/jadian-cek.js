let handler = async (m, { conn, usedPrefix, text }) => {
  function no(number){
    return number.replace(/\s/g,'').replace(/([@+-])/g,'')
  }
	
	text = no(text)
  
  if(isNaN(text)) {
		var number = text.split`@`[1]
	}else if(!isNaN(text)) {
		var number = text
	}

  if(number.length > 15 || (number.length < 9 && number.length > 0)) return conn.reply(m.chat, `Sorry, the number you entered is wrong!`, m)

  if (!text && !m.quoted){
    user = m.sender
    orang = "you"
  }else if(text) {
    var user = number + '@s.whatsapp.net'
    orang = "The person you tagged"
  } else if(m.quoted.sender) {
    var user = m.quoted.sender
    orang = "The person you replied to"
  } else if(m.mentionedJid) {
    var user = number + '@s.whatsapp.net'
    orang = "The person you tagged"
  }

  if (typeof global.db.data.users[user] == "undefined"){
    return m.reply("The target is not registered in the database!")
  }

  if (typeof global.db.data.users[global.db.data.users[user].pasangan] == "undefined" && global.db.data.users[user].pasangan != ""){
    return m.reply("The target is not registered in the database!")
  }

  if (global.db.data.users[user].pasangan == "") {
    conn.reply(m.chat, `${orang} has no partner and not shooting anyone\n\n*Type .shoot @user to shoot someone*`, m)
  }else if (global.db.data.users[global.db.data.users[user].pasangan].pasangan != user){
    conn.reply(m.chat, `${orang} waiting for an answer from @${global.db.data.users[user].pasangan.split('@')[0]} because it is not accepted or rejected\n\nType *${usedPrefix}sincere* to let go!`, m,{contextInfo: {
      mentionedJid: [global.db.data.users[user].pasangan]
    }})
  }else {
    conn.reply(m.chat, `${orang} is in a relationship with @${global.db.data.users[user].pasangan.split('@')[0]} 💓💓💓`, m,{contextInfo: {
      mentionedJid: [global.db.data.users[user].pasangan]
    }})
  }
}
handler.help = ['checkstatus']
handler.tags = ['jadian']
handler.command = /^(checkstatus)$/i
handler.fail = null
module.exports = handler
