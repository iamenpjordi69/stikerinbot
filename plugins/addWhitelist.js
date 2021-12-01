let handler = async (m, { usedPrefix, command, text, args }) => {
    if (!args || !['add', 'remove'].includes(args[0].toLowerCase())) throw `
*Use:* ${usedPrefix + command} <add|remove> number,number,...,number
*Example:*
${usedPrefix + command} add 917428849575,19715122809,0
${usedPrefix + command} remove 917428849575,19715122809,0
`.trim()
    let type = args[0].toLowerCase() === 'add' ? true : false
    let teks = text.replace(args[0], '').trim()
    let users = teks.split(',').map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net')
    for (let who of users) {
        let user = global.db.data.users[who]
        if (!user) user = global.db.data.users[who] = {}
        user.whitelist = type
    }
    m.reply(`Successfully ${type ? 'added' : 'removed'} ${users.length} users as whitelist`)
}
handler.help = ['whitelist'].map(v => v + ' number,number')
handler.tags = ['owner']
handler.command = ['whitelist']

handler.owner = true

module.exports = handler
