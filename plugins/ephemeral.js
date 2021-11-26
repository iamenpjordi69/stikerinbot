let handler = async (m, { conn, args, isBotAdmin, isAdmin, isOwner }) => {
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
    if (args[0] === undefined) {
		await conn.send2Button(m.chat, ` Turn ON/OFF Disappearing Message
\nExample:
${usedPrefix + command} on
${usedPrefix + command} off
	`.trim(), '© MilfBOT', 'ON', ',msgdisappear on', 'OFF', ',msgdisappear off')
		throw false
	}
    if (args[0] == 'on') await conn.toggleDisappearingMessages(
        m.chat,
        7 * 24 * 60 * 60
    )
    else await conn.toggleDisappearingMessages(m.chat, 0)
}
handler.help = ['msgdisappear [on]']
handler.tags = ['tools']
handler.admin = true
handler.command = /^(msgdisappear)$/i

module.exports = handler
