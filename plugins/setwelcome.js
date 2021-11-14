let handler = async (m, { conn, text, isROwner, isOwner, usedPrefix, command }) => {
  if (text) {
    if (isROwner) global.conn.welcome = text
    else if (isOwner) conn.welcome = text
    global.db.data.chats[m.chat].sWelcome = text
    m.reply('Welcome set successfully\n@user (Mention)\n@subject (Group Title)\n@desc (Group Description)')
  } else throw `uhm.. Where is the text?\n\nExample:\n${usedPrefix + command} HI @user\nWelcome to the Group *subject* \n Rules* @desc`
}
handler.help = ['setwelcome <text]
handler.tags = ['owner', 'group']

handler.command = /^setwelcome$/i
module.exports = handler

