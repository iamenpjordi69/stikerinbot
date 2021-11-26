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
		'open': false,
		'buka': false,
		'on': false,
		'1': false,
		'close': true,
		'tutup': true,
		'off': true,
		'0': true,
	}[(args[0] || '')]
	if (isClose === undefined) {`
\nExample:
${usedPrefix + command} on
${usedPrefix + command} off
	`.trim(), '© MilfBOT', 'ON', ',ephe 1', 'OFF', ',ephe 0')
		throw false
	}
    if (args[0] == '0') await conn.toggleDisappearingMessages(m.chat, 0)
	
    if (args[0] == 'on') await conn.toggleDisappearingMessages(
        m.chat,
        7 * 24 * 60 * 60
    )
    //if (args[0] == 'off') await conn.toggleDisappearingMessages(m.chat, 0)
}
handler.help = ['msgdisappear [on]']
handler.tags = ['tools']
handler.admin = true
handler.command = /^(msgdisappear|ephe)$/i

module.exports = handler
