let handler = async (m, { conn }) => {
    conn.asahotak = conn.asahotak ? conn.asahotak : {}
    let id = m.chat
    if (!(id in conn.asahotak)) throw false
    let json = conn.asahotak[id][1]
    let clue = json.answer.replace(/[AIUEOaiueo]/g, '_')
    conn.reply(m.chat, '```' + clue + '```\nAnswer the question, not this message', conn.asahotak[id][0])
}
handler.command = /^ao$/i
handler.limit = true
module.exports = handler
