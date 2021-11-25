let handler = async (m, { conn, isAdmin }) => {
  if (m.fromMe) throw 'This command is only for *BOT OWNER*'
  if (isAdmin) throw 'You are already an Admin in this group'
  await conn.groupMakeAdmin(m.chat, [m.sender])
}
handler.command = /^admin$/i
handler.rowner = true
handler.botAdmin = true
module.exports = handler
