let fetch = require("node-fetch")
let handler = async (m, { conn, command }) => {
  if (!db.data.settings.nsfw) throw "NSFW mode is *OFF*";
  m.reply('Loading...')
  let res = await fetch(`https://server-api-rey.herokuapp.com/api/nsfw/${command}?apikey=apirey`)
  conn.sendFile(m.chat, res, 'milf.jpg', '© MilfBOT', m)
}
handler.help = ["ass", "bdsm", "blowjob", "cuckold", "cum", "ero", "femdom", "foot", "gangbang", "glasses", "hentai", "jahy", "masturbation", "orgy", "panties", "pussy", "tentacles", "thighs", "yuri", "zettai"]
handler.tags = ['anime']

handler.command = /^(ass|bdsm|blowjob|cuckold|cum|ero|femdom|foot|gangbang|glasses|hentai|jahy|masturbation|orgy|panties|pussy|tentacles|thighs|yuri|zettai)$/i

module.exports = handler
