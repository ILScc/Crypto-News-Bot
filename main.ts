import type { NewsFormat } from './src/types';
import { getNewsData } from './src/NewsHandler';
import { Bot } from 'grammy';
import { Menu } from '@grammyjs/menu';
// import { MenuTemplate, MenuMiddleware } from 'grammy-inline-menu';

const BOT_TOKEN = '5360109659:AAGwqfPOimT-bAHiFnFDhXhd5kFR-rE_L20';

const bot = new Bot(BOT_TOKEN);

let news: NewsFormat[] = [];
const menu = new Menu('my-menu-identifier')
    .text('List all news titles', (ctx) => {
        const titles: string[] = [];
        news.forEach(({ title }) => {
            titles.push(title);
        });

        ctx.reply(titles.join(' '));
    }).row();   

bot.use(menu);
bot.command('getnews', async (ctx) => {
    news = await getNewsData() || [];
    await ctx.reply(`I received ${news.length} news`);
    await ctx.reply('You have options to proceed', { reply_markup: menu });
    // news.forEach(({ creationTime, title, url }) => {
    //     const formattedNews = `Title: ${title}\nPostTime: ${creationTime}\nLink: ${url}`;
    //     ctx.reply(formattedNews);
    // });
});
bot.start();
bot.catch((error) => {
    console.dir(error);
});
