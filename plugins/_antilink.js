let handler = m => m

let linkRegex = /chat.whatsapp.com\/(?:invite\/)?([0-9A-Za-z]{20,24})/i
handler.before = async function (m, { isAdmin, isBotAdmin }) {
  if (m.isBaileys && m.fromMe) return true
  let chat = global.db.data.chats[m.chat]
  let isGroupLink = linkRegex.exec(m.text)

  if (chat.antiLink && isGroupLink && !isAdmin && !m.isBaileys && m.isGroup) {
    let thisGroup = `https://chat.whatsapp.com/${await conn.groupInviteCode(m.chat)}`
    if (m.text.includes(thisGroup)) throw false // jika link grup itu sendiri gak dikick
    await this.sendButon(m.chat, `*Link Grup Terdeteksi!*${isBotAdmin ? '' : '\n\nIm not an admin so I cant kick t_t'}\n\nType *.off antilink* to turn off this feature${db.data.settings[this.user.jid].restrict ? '' : '\nType *.on restrict* so that i can kick'}`, '© MilfBOT', 'Turn off Antilink', ',0 antilink', m)
    if (db.data.settings[this.user.jid].restrict) {
      if (isBotAdmin) this.groupRemove(m.chat, [m.sender])
    }
  }
  return true
}

module.exports = handler
