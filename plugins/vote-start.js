let handler = async (m, { conn, text, usedPrefix }) => {
    conn.vote = conn.vote ? conn.vote : {}
    let id = m.chat
    if (id in conn.vote) {
        await conn.sendButton(m.chat, '_There is already voting going on in this chat!_', '© MilfBOT', 'END VOTING', `${usedPrefix}endvote`, m)
        throw false
    }
    await conn.send2Button(m.chat, `   〔 VOTING STARTED 〕
    
*Reason:* ${text}

*${usedPrefix}upvote* - in support
*${usedPrefix}devote* - in against
*${usedPrefix}checkvote* - to check number of vote
*${usedPrefix}endvote* - to end voting`, '© MilfBOT', 'UPVOTE', `${usedPrefix}upvote`, 'DEVOTE', `${usedPrefix}devote`, m)
    conn.vote[id] = [
        text,
        [],
        []
    ]
}
handler.help = ['startvote [reason]']
handler.tags = ['vote']
handler.command = /^(start|mulai)vote$/i
handler.limit = true
handler.group = true
handler.admin = true
module.exports = handler
