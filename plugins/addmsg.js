let { WAMessageProto } = require('@adiwajshing/baileys')

let handler = async (m, { conn, command, usedPrefix, text }) => {
    let M = WAMessageProto.WebMessageInfo
    let which = command.replace(/add/i, '')
    if (!m.quoted) throw 'reply to a message!'
    if (!text) throw `uhm.. teksnya mana?\n\ncontoh:\n${usedPrefix + command} tes`
    let msgs = db.data.msgs
    if (text in msgs) throw `'${text}' registered!`
    msgs[text] = M.fromObject(await m.getQuotedObj()).toJSON()
    await conn.sendButton(m.chat, `successfully added message '${text}'
    
Access with ${usedPrefix}get${which} ${text}`, '© MilfBOT', 'Activate Getmsg', '.on getmsg', m)
}
handler.help = ['vn', 'msg', 'video', 'audio', 'img', 'stiker', 'gif'].map(v => 'add' + v + ' <text>')
handler.tags = ['database']
handler.command = /^add(vn|msg|video|audio|img|stic?ker|gif)$/

module.exports = handler
