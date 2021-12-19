let fetch = require('node-fetch')
let timeout = 120000
let poin = 500
let handler = async (m, { conn, usedPrefix }) => {
    conn.tebakkata = conn.tebakkata ? conn.tebakkata : {}
    let id = m.chat
    if (id in conn.tebakkata) {
        conn.reply(m.chat, 'There are still unanswered questions in this chat', conn.tebakkata[id][0])
        throw false
    }
    let res = await fetch('https://gist.githubusercontent.com/iamenpjordi6/673ebb6ff53ab40fbddf43538e7a7e2c/raw/guesstheword.json')
    if (!res.ok) throw await `${res.status} ${res.statusText}`
    let data = await res.json()
    let json = data[Math.floor(Math.random() * data.length)]
    let caption = `
${json.question}

Timeout *${(timeout / 1000).toFixed(2)} seconds
Type ${usedPrefix}teka for help
Bonus: ${poin} XP
`.trim()
    conn.tebakkata[id] = [
        await conn.sendButton(m.chat, caption, '© MilfBOT', 'HINT', '.teka', m),
        json, poin,
        setTimeout(async () => {
            if (conn.tebakkata[id]) await conn.sendButton(m.chat, `Time is over !!\nThe answer is *${json.answer}*`, '© MilfBOT', 'Guess the Word', '.guesstheword', conn.tebakkata[id][0])
            delete conn.tebakkata[id]
        }, timeout)
    ]
}
handler.help = ['guesstheword']
handler.tags = ['game']
handler.command = /^guesstheword

module.exports = handler
