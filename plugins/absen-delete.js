let handler = async (m, { conn, usedPrefix }) => {
    if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
            global.dfail('admin', m, conn)
            throw false
        }
    }
    let id = m.chat
    conn.absen = conn.absen ? conn.absen : {}
    if (!(id in conn.absen)) {
        await conn.sendButton(m.chat, `No attendance in progress!`, '© MilfBOT', 'Start', `${usedPrefix}startabsent`, m)
        throw false
    }
    delete conn.absen[id]
    m.reply(`Successfully removed attendance!`)
}
handler.help = ['deleteabsent']
handler.tags = ['absent']
handler.command = /^(-|delete)absent$/i

module.exports = handler
