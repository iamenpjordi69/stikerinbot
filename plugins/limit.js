let handler = async (m) => {
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    else who = m.sender
    let user = global.db.data.users[who]
    m.reply(`🧮Limit: *${user.limit}* \n🏵️XP: *${user.exp}* \n📊Level: *${user.level}* \n👑Role *${user.role}*`)
}
handler.help = ['limit [@user]']
handler.tags = ['xp']
handler.command = /^(my|limit)$/i
module.exports = handler
