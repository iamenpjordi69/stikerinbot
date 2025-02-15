//Created By SudoAnirudh

let FormData = require('form-data')
let axios = require('axios')

let handler = async (m, { conn, usedPrefix, command }) => {
  let q = m.quoted ? m.quoted : m
  let mime = (m.quoted ? m.quoted : m.msg).mimetype || ''
  if (!/video|audio/.test(mime)) throw `Reply to the music you want to find with a caption *${usedPrefix + command}*`
 m.reply('Wait,Looking for it....⌛')
				const bodyForm = new FormData()
			        bodyForm.append('audio', await q.download(), 'music.mp3')
           			bodyForm.append('apikey', 'apivinz')
           			axios('https://api.zeks.me/api/searchmusic?apikey=apivinz&audio=https://media1.vocaroo.com/mp3/1ePZvzWDKxIh', {
                		method: 'POST',
                		headers: {
				"Content-Type": "multipart/form-data",
        			...bodyForm.getHeaders()
                		},
                		data: bodyForm
            			})
                		.then(({data}) =>{
				  m.reply(`*Song Found!🥳🥳🥳*\n\n🎵 *Title* : ${data.data.title}\n 👩‍🎤 *Artist* : ${data.data.artists}\n🦚 *Genre* : ${data.data.genre}\n🎫 *Album* : ${data.data.album}\n🎬 *Release* : ${data.data.release_date}`)
				}).catch(() => {
				m.reply('Song Not Found!')
				})
				
}
handler.help = ['findmusic']
handler.tags = ['tools']

handler.command = /^(findmusic)$/i

module.exports = handler
