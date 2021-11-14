let handler = async (m, { conn, text, isROwner, isOwner, usedPrefix, command }) => {
  if (text) {
    if (isROwner) global.conn.bye = text
    else if (isOwner) conn.bye = text
    global.db.data.chats[m.chat].sBye = text
    m.reply('Bye successfully set\n@user (Mention)')
  } else throw `uhm.. Where is the text?\n\nExample:\n${usedPrefix + command} byebye @user\n\n @user left the group @subject`
}
handler.help = ['setbye <text>']
handler.tags = ['owner', 'group']

handler.command = /^setbye$/i
module.exports = handler

