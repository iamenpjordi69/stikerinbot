let fetch = require('node-fetch')

let timeout = 120000
let poin = 500
let handler = async (m, { conn, usedPrefix }) => {
    conn.tebaklagu = conn.tebaklagu ? conn.tebaklagu : {}
    let id = m.chat
    if (id in conn.tebaklagu) {
        conn.reply(m.chat, 'There are still unanswered questions in this chat', conn.tebaklagu[id][0])
        throw false
    }
    // ubah isi 'id' kalo mau ganti playlist spotifynya
    let res = await fetch(global.API('mel', '/game/tebaklagu/', { id: '3AaKHE9ZMMEdyRadsg8rcy' }, 'apikey'))
    if (!res.ok) throw await `${res.status} ${res.statusText}`
    let result = await res.json()
    let json = result.result
    if (!result.status) throw json
    let caption = `
GUESS THE SONG TITLE
Timeout *${(timeout / 1000).toFixed(2)} seconds*
Type *${usedPrefix}check*for help
Bonus: ${poin} XP
*Reply to this message to answer!*`.trim()
    conn.tebaklagu[id] = [
        await m.reply(caption),
        json, poin,
        setTimeout(async () => {
            if (conn.tebaklagu[id]) await conn.sendButton(m.chat, `Time is up!\nThe answer is *${json.judul}*`, '© MilfBOT', 'Guess the Lyrics', `.tebaklirik`, conn.tebaklagu[id][0])
            delete conn.tebaklagu[id]
        }, timeout)
    ]
    await conn.sendFile(m.chat, json.preview, 'eror.mp3', '', m, 1, { mimetype: 'audio/mp4' })
}
handler.help = ['guessthesong']
handler.tags = ['game']
handler.command = /^(guessthesong|gts)$/i

module.exports = handler
