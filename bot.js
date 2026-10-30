const TelegramBot = require('node-telegram-bot-api');

// API Token Bot Anda
const token = '8601594529:AAF3owx-4p9Av7a1NpCVDPyv8fKB5rRLMqY';
const bot = new TelegramBot(token, { polling: true });

// URL Web App Mini Apps Anda (Ganti dengan link hosting web Anda yang aktif)
const WEBAPP_URL = 'https://domain-anda.com/index_4.html';

// Direct Link gambar Postimages Anda
const BANNER_IMAGE_URL = 'https://i.postimg.cc/vDJDyGjW/c9dadf35-6bf8-40a8-a799-35316107cfd7.jpg';

// Listener saat user mengetik /referral, /invite, atau kata 'invite' di bot https://t.me/Fexboostbot
bot.onText(/\/referral|\/invite|invite/, async (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const firstName = msg.from.first_name || 'Crypto Miner';

    // Format referral link otomatis sesuai sistem (startapp=AFEX-UID)
    const referralLink = `https://t.me/Fexboostbot?startapp=AFEX-${userId}`;

    // Caption berbahasa Inggris yang panjang, menarik, dan profesional
    const captionText = `🌟 *WELCOME TO THE FUTURE OF WEB3 MINING, ${firstName}!* 🌟\n\n` +
                        `Are you ready to unlock passive income and maximize your digital assets effortlessly? Dive into the ultimate *AFEX Mining Gold Edition* ecosystem where high-speed automated mining meets decentralized financial freedom.\n\n` +
                        `💎 *Why Join AFEX Today?*\n` +
                        `• 🚀 *12-Hour Auto Mining:* Seamlessly generate tokens around the clock without lifting a finger.\n` +
                        `• 🎁 *Exclusive Rewards:* Claim daily streak bonuses, unlock milestone mystery boxes, and boost your daily APY.\n` +
                        `• 🛡️ *Secure & Instant Payouts:* Direct integration with multi-chain wallets (BEP-20, TON, TRC-20).\n\n` +
                        `Don't watch from the sidelines while others build their wealth. Tap the link below, claim your instant welcome bonus, and start your mining journey right now!\n\n` +
                        `🔗 *Your Personal Invitation Link:*\n` +
                        `\`${referralLink}\``;

    // Tombol Interaktif (Inline Keyboard) untuk kemudahan share dan membuka aplikasi
    const replyMarkup = {
        inline_keyboard: [
            [
                {
                    text: '📤 Share to Friends & Groups',
                    url: `https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent('🚀 Join me on AFEX Mining and let us collect free crypto tokens and USDT together! Tap to start:')}`
                }
            ],
            [
                {
                    text: '⛏️ Launch Mining App',
                    web_app: { url: WEBAPP_URL }
                }
            ]
        ]
    };

    try {
        // Mengirimkan foto otomatis beserta caption panjang dan tombol interaktif
        await bot.sendPhoto(chatId, BANNER_IMAGE_URL, {
            caption: captionText,
            parse_mode: 'Markdown',
            reply_markup: replyMarkup
        });
    } catch (error) {
        console.error("Failed to send referral photo message:", error);
        
        // Fallback: Jika gambar gagal terkirim, kirim pesan teks biasa
        await bot.sendMessage(chatId, `${captionText}\n\n${referralLink}`, {
            parse_mode: 'Markdown',
            reply_markup: replyMarkup
        });
    }
});

console.log("AFEX Telegram Bot is running successfully with your token and image!");
