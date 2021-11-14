let handler = async (m, { text, usedPrefix, command }) => {
    if (!text) throw `uhm.. what are you looking for ?\n\nExample:\n${usedPrefix + command} study`
    let res = await carigroup(text, 'name')
    if (!res.length) throw 'Group not found ¯\_(ツ)_/¯'
    let teks = res.map(res => res.subject + '\n' + res.link).join('\n\n')
    m.reply(teks)
}
handler.help = ['searchgroup <search>']
handler.tags = ['tools']

handler.command = /^searchg(ro?up|c)/i

module.exports = handler

const axios = require('axios')
const cheerio = require('cheerio')
async function carigroup(search, searchby = 'name') {
    let { data } = await axios.get(global.API('http://ngarang.com', '/link-grup-wa/daftar-link-grup-wa.php', {
        search: encodeURIComponent(search),
        searchby,
    }))
    let $ = cheerio.load(data)
    let results = []
    $('#content > div.entry.clearfix > div.wa-chat').each(function (index, element) {
        let subject = $(this).find('div > div.wa-chat-title-container > a > div > div').text().trim()
        let link = $(this).find('div > div.wa-chat-message > a').attr('href').trim()
        results.push({
            subject,
            link
        })
    })
    return results
}
