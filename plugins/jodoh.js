const fetch = require('node-fetch')
let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `Example:\n${usedPrefix + command} Jordi|${conn.getName(m.sender)}`
    let [nama1, nama2] = text.split(/[&|.]/i)
    if (!nama1 || !nama2) throw `Example:\n${usedPrefix + command} Jordi|${conn.getName(m.sender)}`

    let res = await fetch(global.API('zeks', '/api/primbonjodoh', { nama1, nama2 }, 'apikey'))
    if (!res.ok) throw eror
    let json = await res.json()
    if (!json.status) throw json
    let { thumb, positif, negatif } = json.result
    let caption = `
*Name 1:* ${json.result.nama1}
*Name 2:* ${json.result.nama2}

*Positives:*
${positif}

*Negatives:*
${negatif}
`.trim()
    conn.sendFile(m.chat, thumb, 'file.png', caption, m, 0, { thumbnail: await (await fetch(thumb)).buffer() })
}
handler.help = ['jodoh'].map(v => v + ' <name>|<name2>')
handler.tags = ['fun']
handler.command = /^(jodoh)$/i

handler.limit = true

module.exports = handler
