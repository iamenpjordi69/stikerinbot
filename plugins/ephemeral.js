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
.msgdisappear on
.msgdisappear off
	`.trim(), '© MilfBOT', 'ON', ',msgdisappear off', 'OFF', ',msgdisappear off')
		throw false
	}
    if (args[0] == 'off') await conn.toggleDisappearingMessages(m.chat, 0)
	
    if (args[0] == 'on') await conn.toggleDisappearingMessages(
        m.chat,
        7 * 24 * 60 * 60
    )
    //if (args[0] == 'off') await conn.toggleDisappearingMessages(m.chat, 0)
}
handler.help = ['msgdisappear [on]']
handler.tags = ['tools']
handler.admin = true
handler.command = /^(msgdisappear)$/i

module.exports = handler
