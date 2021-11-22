const { MessageType } = require('@adiwajshing/baileys')
const { sticker } = require('../lib/sticker')
let handler = async (m, { conn, args, usedPrefix, command }) => {
  let stiker = false
  try {
    
    let packname ='MilfBOT❤️'
    let author = 'Jordi'
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (/image/.test(mime)) {
      let img = await q.download()
      if (!img) throw `balas gambar dengan caption *${usedPrefix + command}*`
      stiker = await sticker(img, false, packname, author)
    } else if (/video/.test(mime)) {
      if ((q.msg || q).seconds > 11) return m.reply('Maksimal 10 detik!')
      let img = await q.download()
      if (!img) throw `balas video/gif dengan caption *${usedPrefix + command}*`
      stiker = await sticker(img, false, packname, author)
    } else if (/webp/.test(mime)) {
      let img = await q.download()
      if (!img) throw `balas sticker dengan caption *${usedPrefix + command}*`
      stiker = await sticker(img, false, packname, author)
    } else if (args[0]) {
      if (isUrl(args[0])) stiker = await sticker(false, args[0], packname, author)
      else return m.reply('URL tidak valid!')
    }
  } finally {
    if (stiker) conn.sendMessage(m.chat, stiker, MessageType.sticker, {
      quoted: m
    })
    else throw 'Conversion failed'
  }
}
handler.help = ['sticker (caption|reply media)', 'sticker <url>', 'stickergif (caption|reply media)', 'stickergif <url>']
handler.tags = ['sticker']
handler.command = /^s(tic?ker)?(gif)?(wm)?$/i

module.exports = handler

const isUrl = (text) => {
  return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/, 'gi'))
}
