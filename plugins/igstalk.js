const fetch = require('node-fetch')
let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) throw `Example:\n${usedPrefix + command} nsutjordi`

  let res = await fetch(global.API('Dehan', '/api/stalk/instagram', { username: args[0] }))
  if (!res.ok) throw eror
  let json = await res.json()
  if (json.status != 200) throw json
  conn.sendFile(m.chat, json.data.profile_pic_url_hd, 'eror.jpg', `*Name:* ${json.data.full_name}\n*Bio:* ${json.data.biography}\n*Followers:* ${json.data.edge_followed_by.count} )
}
handler.help = ['igstalk <username>']
handler.tags = ['tools']
handler.command = /^(igstalk)$/i
handler.limit = true
module.exports = handler
