const similarity = require('similarity')
const threshold = 0.72
let handler = m => m
handler.before = async function (m) {
    let id = m.chat
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/GUESS THE SONG TITLE/i.test(m.quoted.text)) return !0
    this.tebaklagu = this.tebaklagu ? this.tebaklagu : {}
    if (!(id in this.tebaklagu)) return m.reply('Guess the Song game has ended')
    if (m.quoted.id == this.tebaklagu[id][0].id) {
        let json = JSON.parse(JSON.stringify(this.tebaklagu[id][1]))
        if (/^.*check$/i.test(m.text)) return !0
        if (m.text.toLowerCase() == json.judul.toLowerCase()) {
            global.db.data.users[m.sender].exp += this.tebaklagu[id][2]
            await this.sendButton(m.chat, `*You Guessed Right ✅!* +${this.tebaklagu[id][2]} XP`, '© MilfBOT', 'Guess The Song', '.guessthesong', m)
            clearTimeout(this.tebaklagu[id][3])
            delete this.tebaklagu[id]
        } else if (similarity(m.text.toLowerCase(), json.judul.toLowerCase().trim()) >= threshold) m.reply(`*You are close , try a little more!*`)
        else m.reply(`*Wrong Guess ❌!*`)
    }
    return !0
}
handler.exp = 0

module.exports = handler
