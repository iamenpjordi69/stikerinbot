const fetch = require('node-fetch')
let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) throw `Example:\n${usedPrefix + command} nsutjordi`

  let res = await fetch(`https://fxc7-api.herokuapp.com/api/stalk/ig?apikey=pnj8NAJb&username=${args}`)
   if (!res.ok) throw await res.text()
  let json = await res.json()
  if(!json.result) throw json
  let { full_name, username} = json.result
let spotifyinfo = `Name : ${full_name}
Username : ${username}
`

  await conn.sendFile(m.chat, thumb, '', spotifyinfo, m)
}  
handler.help = ['igstalk <username>']
handler.tags = ['tools']
handler.command = /^(igstalk)$/i
handler.limit = true
module.exports = handler
