const similarity = require('similarity')
const threshold = 0.72
let handler = m => m
handler.before = async function (m) {
    let id = m.chat
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/Type.*who/i.test(m.quoted.contentText)) return !0
    this.siapakahaku = this.siapakahaku ? this.siapakahaku : {}
    if (!(id in this.siapakahaku)) return m.reply('The puzzle has ended')
    if (m.quoted.id == this.siapakahaku[id][0].id) {
        let json = JSON.parse(JSON.stringify(this.siapakahaku[id][1]))
        if (['.who', 'Hint', ''].includes(m.text)) return !0
        if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += this.siapakahaku[id][2]
            await this.sendButton(m.chat, `✅ *You Guessed it Right !* +${this.siapakahaku[id][2]} XP`, '© MilfBOT', 'Who Am I', '.whoami')
            clearTimeout(this.siapakahaku[id][3])
            delete this.siapakahaku[id]
        } else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold) m.reply(`*You are Close, Try a little harder!*`)
        else m.reply(`❌ *Wrong Answer!*`)
    }
    return !0
}
handler.exp = 0

module.exports = handler
