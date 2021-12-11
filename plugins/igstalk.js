const fetch = require('node-fetch')
let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) throw `Example:\n${usedPrefix + command} nsutjordi`

  let res = await fetch(`https://zenzapi.xyz/api/stalker/ig?username=${args}&apikey=zacros`)
   if (!res.ok) throw await res.text()
  let json = await res.json()
  if(!json.result) throw json
  let { full_name, user_name, followers, following, user_id, private, verified, biography, profile_hd} = json.result
let spotifyinfo = `🎯 *Name:* ${full_name}
👥 *Following:* ${following}
👩‍👩‍👧‍👧 *Followers:* ${followers}
📮 *User ID:* ${user_id}
🔒 *Private Account:* ${private} 

📜 *Bio:* ${biography}
🔗 *Profile URL:* https://www.instagram.com/${user_name}
`

  await conn.sendFile(m.chat, profile_hd, '', spotifyinfo, m)
}  
handler.help = ['igstalk <username>']
handler.tags = ['tools']
handler.command = /^(igstalk)$/i
handler.limit = true
module.exports = handler
