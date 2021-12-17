const fetch = require('node-fetch')
let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) throw `Example:\n${usedPrefix + command} nsutjordi`

  let res = await fetch('https://upgrade/api/instagram/stalk?user=nsutjordi', {
    headers: {
        'accept': 'application/json'
    }
    });
   if (!res.ok) throw await res.text()
  let json = await res.json()
  if(!json.result) throw json
  let { name, username, follower_count, following_count, media_count, private, verified, bio, profile_url} = json.result
let spotifyinfo = `🎯 *Name:* ${name}
👥 *Following:* ${follower_count}
👩‍👩‍👧‍👧 *Followers:* ${following_count}
📮 *Total Post:* ${media_count}
🔒 *Account Type:* ${private} 

📜 *Bio:* ${bio}
🔗 *Profile URL:* https://www.instagram.com/${username}
`

  await conn.sendFile(m.chat, profile_url, '', spotifyinfo, m)
}  
handler.help = ['igstalk <username>']
handler.tags = ['tools']
handler.command = /^(igstalk)$/i
handler.limit = true
module.exports = handler
