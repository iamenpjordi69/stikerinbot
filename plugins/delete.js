let handler = function (m) {
  if (!m.quoted) throw false
  let { chat, fromMe, id, isBaileys } = m.quoted
  if (!fromMe) throw false
  if (/Stikerin Broadcast/i.test(m.quoted.text)) throw 'Cannot delete broadcast messages!'
  if (!isBaileys) throw 'The message was not sent by a bot!'
  this.deleteMessage(chat, {
    fromMe,
    id,
    remoteJid: chat
  })
}
handler.help = ['del', 'delete']
handler.tags = ['info']
handler.admin = true

handler.command = /^del(ete)?$/i

module.exports = handler
