const similarity = require('similarity')
const threshold = 0.72
let handler = m => m
handler.before = async function (m) {
    let id = m.chat
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/Type.*teka/i.test(m.quoted.contentText)) return !0
    this.tebakkata = this.tebakkata ? this.tebakkata : {}
    if (!(id in this.tebakkata)) return m.reply('The matter has ended')
    if (m.quoted.id == this.tebakkata[id][0].id) {
        let json = JSON.parse(JSON.stringify(this.tebakkata[id][1]))
        if (['.teka', 'HINT', ''].includes(m.text)) return !0
        if (m.text.toLowerCase() == json.answer.toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += this.tebakkata[id][2]
            await this.sendButton(m.chat, `*Correct Answer ✅!* \n\n +${this.tebakkata[id][2]} XP`, '© MilfBOT', 'Guess the Word', '.guesstheword', m)
            clearTimeout(this.tebakkata[id][3])
            delete this.tebakkata[id]
        } else if (similarity(m.text.toLowerCase(), json.answer.toLowerCase().trim()) >= threshold) m.reply(`*You are close, a little more!*`)
        else m.reply(`*Wrong Answer ❌!*`)
    }
    return !0
}
handler.exp = 0

module.exports = handler
