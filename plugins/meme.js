let fetch = require('node-fetch')

let handler = async (m, { conn, text }) => {
let res = await fetch('https://gist.githubusercontent.com/iamenpjordi6/398997898e008d0c622332482d1397c8/raw/joke.json')
if (!res.ok) throw await `${res.status} ${res.statusText}`;
let json = await res.json();
let url = json[Math.floor(Math.random() * json.length)]
await conn.sendButtonImg(m.chat, await (await fetch(url)).buffer(), 'Joke', '© MilfBOT', 'Get Again', '/joke', m)
}
handler.command = /^(meme)$/i
handler.tags = ['fun']
handler.help = ['meme']
handler.nsfw = true
module.exports = handler
