let handler = async (m, { conn, isOwner, usedPrefix, text, isAdmin }) => {
    if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
            global.dfail('admin', m, conn)
            throw false
        }
    }
    conn.absen = conn.absen ? conn.absen : {}
    let id = m.chat
    if (id in conn.absen) {
        await conn.sendButton(m.chat, `There are still absences in this chat!`, '© MilfBOT', 'Delete', `${usedPrefix}deleteabsent`, conn.absen[id][0])
        throw false
    }
    conn.absen[id] = [
        await conn.sendButton(m.chat, `Begin Attendance`, '© MilfBOT', 'Absent', `${usedPrefix}absent`, m),
        [],
        text
    ]
}
handler.help = ['startabsent [teks]']
handler.tags = ['absent']
handler.command = /^(\+|start)absent$/i

module.exports = handler
