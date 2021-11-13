let fetch = require("node-fetch")

let handler = async (m, { conn, text }) => {
  let res = await fetch(API('https://meme-api.herokuapp.com', '/gimme/' + encodeURI(text || ''), {}))
  if (!res.ok) throw eror
  let json = await res.json()
  if (!json.url) throw 'Media not found!'
  if (json.nsfw && !db.data.settings.nsfw) throw 'NSFW mode is *OFF* '

  await conn.sendFile(m.chat, json.url, text, json.title, m, false, { thumbnail: await (await fetch(json.url)).buffer() })
}
handler.help = ['subreddit <search>']
handler.tags = ['internet']
handler.command = /^(sr|subreddit)$/i

module.exports = handler
