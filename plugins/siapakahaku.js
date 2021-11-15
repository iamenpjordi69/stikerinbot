let fetch = require('node-fetch')

let timeout = 120000
let poin = 500
let handler = async (m, { conn, usedPrefix }) => {
    conn.siapakahaku = conn.siapakahaku ? conn.siapakahaku : {}
    let id = m.chat
    if (id in conn.siapakahaku) {
        conn.reply(m.chat, 'There are still unanswered questions in this chat', conn.siapakahaku[id][0])
        throw false
    }
    let src = await (await fetch('https://gist.githubusercontent.com/iamenpjordi6/a1ba22477cc9d46e6757e5b256f0857e/raw/whoami.json')).json()
    let json = src[Math.floor(Math.random() * src.length)]
    let caption = `
${json.soal}

Timeout *${(timeout / 1000).toFixed(2)} seconds*
Type ${usedPrefix}who for help
Bonus: ${poin} XP
`.trim()
    conn.siapakahaku[id] = [
        await conn.sendButton(m.chat, caption, '© MilfBOT', 'Hint', '.who'),
        json, poin,
        setTimeout(async () => {
            if (conn.siapakahaku[id]) await conn.sendButton(m.chat, `Time is up!\nThe answer is *${json.jawaban}*`, '© MilfBOT', 'Who Am I', '.whoami')
            delete conn.siapakahaku[id]
        }, timeout)
    ]
}
handler.help = ['whoami']
handler.tags = ['game']
handler.command = /^whoami/i

module.exports = handler
