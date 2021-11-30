let handler = m => m

handler.all = async function (m) {
    /* 
   automatically clears the conversation when there is an OVERSIZED message
    https://github.com/adiwajshing/Baileys/blob/3507f8f/WAMessage/WAMessage.d.ts#L18605
    */
    if (m.messageStubType === 68) {
        await this.modifyChat(m.chat, 'clear', {
            includeStarred: false
        }).catch(console.log)
    }
}

module.exports = handler
