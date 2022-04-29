
import { Telegraf } from 'telegraf';
import type { NewsFormat } from './types';
import { getNewsData } from './NewsHandler';
const BOT_TOKEN = '5360109659:AAGwqfPOimT-bAHiFnFDhXhd5kFR-rE_L20';


const bot = new Telegraf(BOT_TOKEN);
bot.command('getnews', async (ctx) => {
    const news: NewsFormat[] = await getNewsData() || [];
    news.forEach(({ creationTime, title, url }) => {
        const formattedNews = `Title:${title}\nPostTime:${creationTime}\nLink:${url}`;
        ctx.reply(formattedNews);
    });
});
bot.launch();


