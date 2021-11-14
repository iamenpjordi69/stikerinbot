let fetch = require("node-fetch");
let handler = async (m, { conn }) => {
  if (!db.data.settings.nsfw) throw "NSFW mode is *OFF*";
  let res = await fetch(global.API("https://api.waifu.pics/", "/nsfw/waifu"));
  if (!res.ok) throw await `${res.status} ${res.statusText}`;
  let json = await res.json();
  if (json.url)
    conn.sendFile(
      m.chat,
      json.url,
      "cartoon porn",
      "how awesome is the cartoon, stress...",
      m
    );
  else throw json;
};
handler.help = ["nsfwwaifu", "waifunsfw"];
handler.tags = ["anime"];

handler.command = /^(nsfwwaifu|waifunsfw)$/i;

handler.limit = true;

module.exports = handler;
