let handler = async (m, { conn, args, usedPrefix, command, isBotAdmin, isAdmin, isOwner }) => {
    if (m.isGroup) {
        if (!isBotAdmin) {
            global.dfail('botAdmin', m, conn)
            throw false
        }
        if (!(isAdmin || isOwner)) {
            global.dfail('admin', m, conn)
            throw false
        }
    }
    let isClose = {
		'close': 0,
		'off': 0,
		'0': 0,
		'open': 7 * 24 * 60 * 60,
		'on': 7 * 24 * 60 * 60,
		'1': 7 * 24 * 60 * 60,
	}[(args[0] || '')]
	if (isClose === undefined) {`
\nExample:
${usedPrefix + command} on
${usedPrefix + command} off
	`.trim(), '© MilfBOT', 'ON', '.msgdisappear on', 'OFF', '.msgdisappear off')
		throw false
	}
     	await conn.toggleDisappearingMessages(m.chat, isClose)
   
}
handler.help = ['msgdisappear [on]']
handler.tags = ['tools']
handler.admin = true
handler.command = /^(msgdisappear)$/i

module.exports = handler
