let handler = async (m, { conn, usedPrefix }) => {
  if (global.conn.user.jid == conn.user.jid) conn.reply(m.chat, 'This command is only for bots', m)
  else global.conn.reply(conn.user.jid, `${usedPrefix}jadibot nikalbsdk${Buffer.from(JSON.stringify(conn.base64EncodedAuthInfo())).toString('base64')}ajnvhdjbvj=`, m)
}
handler.help = ['getcode']
handler.tags = ['jadibot']
handler.command = /^(disabled2)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler
