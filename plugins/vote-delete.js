let handler = async (m, { conn, usedPrefix }) => {
    let id = m.chat
    conn.vote = conn.vote ? conn.vote : {}
    if (!(id in conn.vote)) {
        await conn.sendButton(m.chat, `_*No voting in this group!*_`, '© MilfBOT', 'START VOTE', `${usedPrefix}startvote`, m)
        throw false
    }
    delete conn.vote[id]
    m.reply(`Voting Ended Successfully!`)

}
handler.help = ['unvote']
handler.tags = ['vote']
handler.command = /^(end|un)vote$/i
handler.group = true
handler.admin = true
module.exports = handler
