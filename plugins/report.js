let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `If you find an error message, report it using this command\n\nExample:\n${usedPrefix + command} Good afternoon owner, I found an error like the following <copy/tag the error message>`
    if (text.length < 10) throw `The report is too short, at least 10 characters!`
    if (text.length > 1000) throw `Report is too long, maximum 1000 characters!`
    let teks = `*${command.toUpperCase()}!*\n\nFrom : *@${m.sender.split`@`[0]}*\n\nMessage : ${text}\n`
    conn.reply(global.owner[0] + '@s.whatsapp.net', m.quoted ? teks + m.quoted.text : teks, null, {
        contextInfo: {
            mentionedJid: [m.sender]
        }
    })
    m.reply(`_Message sent to bot owner, if ${command.toLowerCase()} you will sapam, you will not get any responses._`)
}
handler.help = ['report', 'request'].map(v => v + ' <text>')
handler.tags = ['info']
handler.command = /^(report|request)$/i
module.exports = handler
