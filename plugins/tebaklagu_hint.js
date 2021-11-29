let handler = async (m, { conn }) => {
    conn.tebaklagu = conn.tebaklagu ? conn.tebaklagu : {}
    let id = m.chat
    if (!(id in conn.tebaklagu)) throw false
    let json = conn.tebaklagu[id][1]
    let clue = json.judul.replace(/[AIUEOaiueo]/g, '_')
    conn.reply(m.chat, '```' + clue + '```\nReply to the question, not this message or the audio', conn.tebaklagu[id][0])
}
handler.command = /^check$/i
handler.limit = true
module.exports = handler
