const fetch = require('node-fetch')
let timeout = 120000
let poin = 500
let handler = async (m, { conn, usedPrefix }) => {
    conn.asahotak = conn.asahotak ? conn.asahotak : {}
    let id = m.chat
    if (id in conn.asahotak) {
        conn.reply(m.chat, 'There are still unanswered questions in this chat', conn.asahotak[id][0])
        throw false
    }
    let src = await (await fetch('https://gist.githubusercontent.com/iamenpjordi6/169dcf186813a22f7159b3fe4ad02e5a/raw/brainteaser.json')).json()
    let json = src[Math.floor(Math.random() * src.length)]
    let caption = `
${json.question}

_Repy to this message with answer_
Timeout *${(timeout / 1000).toFixed(2)} seconds*
Type ${usedPrefix}ao for help
Bonus: ${poin} XP
    `.trim()
    conn.asahotak[id] = [
        await conn.sendButton(m.chat, caption, '© MilfBOT', 'Hint', '.ao', m),
        json, poin,
        setTimeout(async () => {
            if (conn.asahotak[id]) await conn.sendButton(m.chat, `Time is up!\nThe answer is *${json.answer}*`, '© MilfBOT', 'Brain Teaser', '.brainteaser', conn.asahotak[id][0])
            delete conn.asahotak[id]
        }, timeout)
    ]
}
handler.help = ['brainteaser']
handler.tags = ['game']
handler.command = /^brainteaser/i

module.exports = handler
