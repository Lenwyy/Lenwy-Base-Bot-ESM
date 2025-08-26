/*  

  Made By Lenwy
  Base : Lenwy
  WhatsApp : wa.me/6283829814737
  Telegram : t.me/ilenwy
  Youtube : @Lenwy

  Channel : https://whatsapp.com/channel/0029VaGdzBSGZNCmoTgN2K0u

  Copy Code?, Recode?, Rename?, Reupload?, Reseller? Taruh Credit Ya :D

  Deskripsi: Fungsi Untuk Mengambil Respons AI
  Mohon Untuk Tidak Menghapus Watermark Di Dalam Kode Ini

*/

import axios from 'axios';

export async function Ai4Chat(prompt) {
    const url = new URL("https://yw85opafq6.execute-api.us-east-1.amazonaws.com/default/boss_mode_15aug");
    url.search = new URLSearchParams({
        text: prompt,
        country: "Europe",
        user_id: "Av0SkyG00D" // Thanks To Avosky
    }).toString();

    try {
        const response = await axios.get(url.toString(), {
            headers: {
                "User-Agent": "Mozilla/5.0 (Linux; Android 11; Infinix) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.0.0 Mobile Safari/537.36",
                Referer: "https://www.ai4chat.co/pages/riddle-generator"
            }
        });

        if (response.status !== 200) {
            throw new Error(`Error: ${response.status}`);
        }

        return response.data;
    } catch (error) {
        console.error("Fetch error:", error.message);
        throw error;
    }
}

export default Ai4Chat;