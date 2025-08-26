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

async function tiktok2(query) {
  return new Promise(async (resolve, reject) => {
    try {
      const encodedParams = new URLSearchParams();
      encodedParams.set('url', query);
      encodedParams.set('hd', '1');

      const response = await axios({
        method: 'POST',
        url: 'https://tikwm.com/api/',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'Cookie': 'current_language=en',
          'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36'
        },
        data: encodedParams
      });

      const videos = response.data.data;
      const result = {
        title: videos.title,
        cover: videos.cover,
        origin_cover: videos.origin_cover,
        no_watermark: videos.play,
        watermark: videos.wmplay,
        music: videos.music
      };
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}

export default tiktok2;
