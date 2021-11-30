let moment = require('moment-timezone')

let handler = m => m

handler.all = async function (m, { isBlocked }) {

    if (m.chat.endsWith('broadcast') || m.fromMe || isBlocked || m.isGroup || db.data.settings[this.user.jid].group) return
    let user = global.db.data.users[m.sender]
    if (new Date - user.pc < 86400000) return // setiap 24 jam sekali
    await this.sendButton(m.chat, `
Hi, ${ucapan()}

${user.banned ? 'You are Banned' : `Can Anyone help ${this.user.name} ?`}
`.trim(), '© MilfBOT', user.banned ? 'Bot Owner' : 'Menu', user.banned ? ',owner' : ',?', m)
    user.pc = new Date * 1
}

module.exports = handler

function ucapan() {
    const time = moment.tz('Asia/Kolkata').format('HH')
    res = "Have a Nice Day ❤️"
    if (time >= 4) {
        res = "Good Morning ❤️"
    }
    if (time > 12) {
        res = "Good Afternoon ❤️"
    }
    if (time >= 16) {
        res = "Good Evening ❤️"
    }
    if (time >= 21) {
        res = "Good Night ❤️"
    }
    return res
}
