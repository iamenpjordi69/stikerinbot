let handler = async (m, { conn, usedPrefix }) => {
    let id = m.chat
    conn.vote = conn.vote ? conn.vote : {}
    if (!(id in conn.vote)) {
        await conn.sendButton(m.chat, `_*No voting in this group!*_`, '© MilfBOT', 'START VOTE', `${usedPrefix}startvote`, m)
        throw false
    }

    let [reason, upvote, devote] = conn.vote[id]
    let mentionedJid = [...upvote, ...devote]
    let caption = `
    〔 VOTE 〕

*Reason:* ${reason}

*UPVOTES*
_Total: ${upvote.length}_
${upvote.map(u => '@' + u.split('@')[0]).join('\n')}

*DEVOTES*
_Total: ${devote.length}_
${devote.map(u => '@' + u.split('@')[0]).join('\n')}

_by Jordi_
    `.trim()
    await conn.send3Button(m.chat, caption, '© MilfBOT', 'UPVOTE', `${usedPrefix}upvote`, 'DEVOTE', `${usedPrefix}devote`, 'DELETE VOTE', `${usedPrefix}deletevote`, m, { contextInfo: { mentionedJid } })
}
handler.help = ['checkvote']
handler.tags = ['vote']
handler.command = /^checkvote$/i
handler.group = true
module.exports = handler
