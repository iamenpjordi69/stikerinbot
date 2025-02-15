let levelling = require('../lib/levelling')
let { MessageType } = require('@adiwajshing/baileys')
let fs = require('fs')
let path = require('path')
let fetch = require('node-fetch')
let moment = require('moment-timezone')
const defaultMenu = {
  before: `
┌─〔 %me 〕
├ Hi, %name!
│
├ Limit Left *%limit Limit*
├ Role *%role*
├ Level *%level (%exp / %maxexp)* [%xp4levelup]
├ %totalexp XP in Total
│ 
├ Date: *%week , %date*
├ Islamic Date: *%dateIslamic*
├ Time: *%time*
│
├ Uptime: *%uptime (%muptime)*
├ Database: %rtotalreg out of %totalreg
├ Github:
├ github.com/iamenpjordi
└────
%readmore`.trimStart(),
  header: '┌─〔 %category 〕',
  body: '├ %cmd %islimit %isPremium',
  footer: '└────\n',
  after: `
*MilfBOT V1.0.0*
${'```MilfBOT```'}
`,
}
let handler = async (m, { conn, usedPrefix: _p, args, command }) => {
  let tags
  let teks = `${args[0]}`.toLowerCase()
  let arrayMenu = ['all', 'game', 'xp', 'sticker', 'kerangajaib', 'quotes', 'admin', 'group', 'premium', 'internet', 'anime',  'anonymous', 'nulis', 'downloader', 'tools', 'fun', 'database', 'quran', 'audio', 'jadibot', 'info', 'uncategorised', 'owner']
  if (!arrayMenu.includes(teks)) teks = '404'
  if (teks == 'all') tags = {
    'main': 'Main',
    'game': 'Game',
    'xp': 'Exp & Limit',
    'sticker': 'Sticker',
    'kerang': 'Magic Shell',
    'quotes': 'Quotes',
    'admin': `Admin ${global.opts['restrict'] ? '' : '(Disabled)'}`,
    'group': 'Group',
    'premium': 'Premium',
    'internet': 'Internet',
    'anime': 'Anime',
    'anonymous': 'Anonymous Chat',
    'nulis': 'TextMaker & Logo',
    'downloader': 'Downloader',
    'tools': 'Tools',
    'fun': 'Fun',
    'database': 'Database',
    'vote': 'Voting',
    'absen': 'Absen',
    'quran': 'Al Qur\'an',
    'audio': 'Voice Changer',
    'jadibot': 'Jadi Bot',
    'info': 'Info',
    '': 'Uncategorised',
  }
  if (teks == 'game') tags = {
    'game': 'Game'
  }
  if (teks == 'xp') tags = {
    'xp': 'Exp & Limit'
  }
  if (teks == 'sticker') tags = {
    'sticker': 'Sticker'
  }
  if (teks == 'kerangajaib') tags = {
    'kerang': 'Kerang Ajaib'
  }
  if (teks == 'quotes') tags = {
    'quotes': 'Quotes'
  }
  if (teks == 'admin') tags = {
    'admin': `Admin ${global.opts['restrict'] ? '(Enabled)' : '(Disabled)'}`
  }
  if (teks == 'group') tags = {
    'group': 'Group'
  }
  if (teks == 'premium') tags = {
    'premium': 'Premium'
  }
  if (teks == 'internet') tags = {
    'internet': 'Internet'
  }
  if (teks == 'anime') tags = {
    'anime': 'Anime'
  }
  if (teks == 'anonymous') tags = {
    'anonymous': 'Anonymous Chat'
  }
  if (teks == 'nulis') tags = {
    'nulis': 'MagerNulis & Logo'
  }
  if (teks == 'downloader') tags = {
    'downloader': 'Downloader'
  }
  if (teks == 'tools') tags = {
    'tools': 'Tools'
  }
  if (teks == 'fun') tags = {
    'fun': 'Fun'
  }
  if (teks == 'database') tags = {
    'database': 'Database'
  }
  if (teks == 'vote') tags = {
    'vote': 'Voting',
    'absen': 'Absen'
  }
  if (teks == 'quran') tags = {
    'quran': 'Al Qur\'an'
  }
  if (teks == 'audio') tags = {
    'audio': 'Voice Changer'
  }
  if (teks == 'jadibot') tags = {
    'jadibot': 'Jadi Bot'
  }
  if (teks == 'info') tags = {
    'info': 'Info'
  }
  if (teks == 'uncategorised') tags = {
    '': 'Uncategorised'
  }
  if (teks == 'owner') tags = {
    'owner': 'Owner',
    'host': 'Host',
    'advanced': 'Advanced'
  }



  try {
    let package = JSON.parse(await fs.promises.readFile(path.join(__dirname, '../package.json')).catch(_ => '{}'))
    let { exp, limit, level, role, registered } = global.db.data.users[m.sender]
    let { min, xp, max } = levelling.xpRange(level, global.multiplier)
    let name = registered ? global.db.data.users[m.sender].name : conn.getName(m.sender)
    let d = new Date(new Date + 3600000)
    let locale = 'en-US'
    // d.getTimeZoneOffset()
    // Offset -420 is 18.00
    // Offset    0 is  0.00
    // Offset  420 is  7.00
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + 'en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.help) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    if (teks == '404') {
      return conn.relayWAMessage(conn.prepareMessageFromContent(m.chat, {
        "listMessage": {
          "title": `${ucapan()}, ${name}`.trim(),
          "description": "© MilfBOT",
          "buttonText": "MENU",
          "listType": "SINGLE_SELECT",
          "sections": [
            {
              "rows": [
                {
                  "title": `All Commands`,
                  "description": "Gives All Commands of the BOT",
                  "rowId": `${_p}? all`
                }, {
                  "title": "Game",
                  "description": "Game Related Plugins",
                  "rowId": `${_p}? game`

                }, {
                  "title": "XP",
                  "description": "XP&Level Related Commands",
                  "rowId": `${_p}? xp`

                }, {
                  "title": "Sticker",
                  "description": "Sticker Related Commands",
                  "rowId": `${_p}? sticker`
                }, {
                  "title": "Magic Shell",
                  "description": "",
                  "rowId": `${_p}? kerangajaib`
                }, {
                  "title": "Quotes",
                  "description": "Commands for Quotes",
                  "rowId": `${_p}? quotes`
                }, {
                  "title": "Admin",
                  "description": "Group Admin Related Commands",
                  "rowId": `${_p}? admin`
                }, {
                  "title": "Group",
                  "description": "Group Related Commands",
                  "rowId": `${_p}? group`
                }, {
                  "title": "Premium",
                  "description": "Only for Premium users",
                  "rowId": `${_p}? premium`
                }, {
                  "title": "Internet",
                  "description": "Commands related to internet",
                  "rowId": `${_p}? internet`
                }, {
                  "title": "Anime",
                  "description": "Commands related to Anime/Hentai",
                  "rowId": `${_p}? anime`
                }, {
                  "title": "Anonymous",
                  "description": "Start anonymous chat",
                  "rowId": `${_p}? anonymous`
                }, {
                  "title": "Nulis & Logo",
                  "description": "Test and Logo making Commands",
                  "rowId": `${_p}? nulis`
                }, {
                  "title": "Downloader",
                  "description": "Media Downloader Commands",
                  "rowId": `${_p}? downloader`
                }, {
                  "title": "Tools",
                  "description": "Tools and convertors",
                  "rowId": `${_p}? tools`
                }, {
                  "title": "Fun",
                  "description": "Mini games and fun commands",
                  "rowId": `${_p}? fun`
                }, {
                  "title": "Database",
                  "description": "Commands to View/Update Database",
                  "rowId": `${_p}? database`
                }, {
                  "title": "Vote & Absen",
                  "description": "Commands Related to Voting",
                  "rowId": `${_p}? vote`
                }, {
                  "title": "Al-Qur\'an",
                  "description": "Quran etc",
                  "rowId": `${_p}? quran`
                }, {
                  "title": "Voice Changer",
                  "description": "Lists Various VoiceChanger effects",
                  "rowId": `${_p}? audio`
                }, {
                  "title": "Jadi Bot",
                  "description": "Bot Hosting Commands",
                  "rowId": `${_p}? jadibot`
                }, {
                  "title": "Info",
                  "description": "Shows Bot info",
                  "rowId": `${_p}? info`
                }, {
                  "title": "Uncategorised",
                  "description": "Commands that belong to no Category",
                  "rowId": `${_p}? uncategorised`
                }, {
                  "title": "Owner",
                  "description": "Commands for Owner",
                  "rowId": `${_p}? owner`
                }
              ]
            }
          ], "contextInfo": {
            "stanzaId": m.key.id,
            "participant": m.sender,
            "quotedMessage": m.message
          }
        }
      }, {}), { waitForAck: true })
    }
    // gunakan ini jika kamu menggunakan whatsapp bisnis
    //   throw `
    // ┌〔 DAFTAR MENU 〕
    // ├ ${_p + command} all
    // ├ ${_p + command} game
    // ├ ${_p + command} xp
    // ├ ${_p + command} stiker
    // ├ ${_p + command} kerang
    // ├ ${_p + command} quotes
    // ├ ${_p + command} admin
    // ├ ${_p + command} group
    // ├ ${_p + command} premium
    // ├ ${_p + command} internet
    // ├ ${_p + command} anonymous
    // ├ ${_p + command} nulis
    // ├ ${_p + command} downloader
    // ├ ${_p + command} tools
    // ├ ${_p + command} fun
    // ├ ${_p + command} database
    // ├ ${_p + command} vote
    // ├ ${_p + command} quran
    // ├ ${_p + command} audio
    // ├ ${_p + command} jadibot
    // ├ ${_p + command} info
    // ├ ${_p + command} tanpa kategori
    // ├ ${_p + command} owner
    // └────  
    //     `.trim()
    let groups = {}
    for (let tag in tags) {
      groups[tag] = []
      for (let plugin of help)
        if (plugin.tags && plugin.tags.includes(tag))
          if (plugin.help) groups[tag].push(plugin)
      // for (let tag of plugin.tags)
      //   if (!(tag in tags)) tags[tag] = tag
    }
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == global.conn.user.jid ? '' : `Powered BY https://wa.me/${global.conn.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                .replace(/%islimit/g, menu.limit ? '(Limit)' : '')
                .replace(/%isPremium/g, menu.premium ? '(Premium)' : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: _p, uptime, muptime,
      me: conn.user.name,
      npmname: package.name,
      npmdesc: package.description,
      version: package.version,
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp <= 0 ? `Ready for *${_p}levelup*` : `${max - exp} more XP for levelup`,
      github: package.homepage ? package.homepage.url || package.homepage : '[unknown github url]',
      level, limit, name, weton, week, date, dateIslamic, time, totalreg, rtotalreg, role,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
    await conn.send2ButtonLoc(m.chat, await (await fetch(fla + teks)).buffer(), text.trim(), 'Made with ❤️ by Jordi', 'Bot Owner', `${_p}owner`, 'Donate', `${_p}donate`, m)
  } catch (e) {
    conn.reply(m.chat, 'Sorry,This menu has some errors', m)
    throw e
  }
}
handler.help = ['menu', 'help', '?']
handler.tags = ['main']
handler.command = /^(menu|help|\?)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 3

module.exports = handler

const more = String.fromCharCode(1)
const readMore = more.repeat(1)

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
function ucapan() {
  const time = moment.tz('Asia/Kolkata').format('HH')
  res = "Good Morning ❤️"
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
