const axios = require("axios");

const TOKEN = "913651672:gduYv3bBK3nHscslebOlpDHKWunLVi8r7rM"
const BASE_URL = `https://tapi.bale.ai/bot${TOKEN}`;

async function sendMessage(chatId, text) {
  try {
    const res = await axios.post(`${BASE_URL}/sendMessage`, {
      chat_id: chatId,
      text: text
    });

    console.log(res.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
  }
}

sendMessage(686222237, "سلام از Node.js 🚀");
// ----------------------------------------------
// async function getUpdates() {
//   const res = await axios.get(`${BASE_URL}/getUpdates`);
//   console.log(JSON.stringify(res.data, null, 2));
// }
// getUpdates()