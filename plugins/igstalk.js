const fetch = require('node-fetch')
let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) throw `Example:\n${usedPrefix + command} __a_n_i_r_u_d_h_`

  let res = await fetch(`https://fxc7-api.herokuapp.com/api/stalk/ig?apikey=pnj8NAJb&username=nsutjordi`)
  if (!res.ok) throw eror
  let json = await res.json()
  let { full_name, biography, followers, following, posts_count, is_private, is_verified, profile_url } = json.result
  if (json.status != 200) throw json
  conn.sendFile(m.chat, profile_url, 'eror.jpg', `*Name:* ${full_name}\n*Bio:* ${biography}\n*Followers:* ${followers}\n*Following:* ${following}\n*Posts:* ${posts_count}\n*Private:* ${is_private}\n*Verified:* ${is_verified}\n\nhttps://www.instagram.com/nsutjordi`, m, 0 )
}
handler.help = ['igstalk <username>']
handler.tags = ['tools']
handler.command = /^(igstalk)$/i
handler.limit = true
module.exports = handler
