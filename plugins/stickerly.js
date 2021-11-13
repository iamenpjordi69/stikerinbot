const fetch = require('node-fetch')
const { MessageType } = require('@adiwajshing/baileys')
const { sticker } = require('../lib/sticker')

let handler = async (m, { conn, text, usedPrefix, command }) => {

    if (!text) throw `*This command is to retrieve stickers from Stickerly based on a search*\n\nUsage examples:\n${usedPrefix + command} cheems`

    let res = await fetch(global.API('zeks', '/api/searchsticker', { q: text }, 'apikey'))
    if (!res.ok) throw eror
    let json = await res.json()
    if (!json.status) throw json
    let hasil = json.sticker.map((v, i) => `${i + 1}. ${v}`).join('\n')
    m.reply(`*${json.title}*
*Estimated time of completion:* ${json.sticker.length * 1.5} seconds
`.trim())

    for (let i of json.sticker) {
        stiker = await sticker(false, i, global.packname, global.author)
        await conn.sendMessage(m.chat, stiker, MessageType.sticker)
        await delay(1500)
    }
    m.reply('_*Finished*_')

}
handler.help = ['stickerly <search>']
handler.tags = ['sticker']
handler.command = /^(stic?kerly)$/i

handler.limit = true

module.exports = handler

const delay = time => new Promise(res => setTimeout(res, time))
