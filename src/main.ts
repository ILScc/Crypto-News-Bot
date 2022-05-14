import type { NewsFormat } from './types';
import { getNewsData } from './NewsHandler';
import { Bot } from 'grammy';
import { Menu } from '@grammyjs/menu';
import { BOT_API_KEY } from '../secrets';

const bot = new Bot(BOT_API_KEY);
let news: NewsFormat[] = [];
let lastShownNewsIdx = 0;
bot.api.setMyCommands([
    { command: 'news', description: 'Load news' },
    { command: 'help', description: 'Show help text' },
    { command: 'settings', description: 'Open settings' },
    { command: 'find', description: 'Find article by name' }, // TODO: реализовать добавление
]);
const menu = new Menu('mainMenu')
    .text('List all news titles', async (ctx) => {
        const titles: string[] = [];
        for (const { title } of news) {
            titles.push(title);
        }
        await ctx.reply(titles.map((title, idx) => `<b>${idx + 1}:</b> ${title}`).join('\n'), { parse_mode: 'HTML' });
    }).row().text('Load next 5 news', async (ctx) => {
        for (const { creationTime, title, url } of news.slice(lastShownNewsIdx,lastShownNewsIdx + 5)) {
            const formattedNews = `<b>Title:</b> ${title}\n<b>PostTime:</b> ${creationTime}\n<b>Link:</b> ${url}`;
            ctx.reply(formattedNews, { parse_mode: 'HTML' });
        }
        lastShownNewsIdx += 5;
        await ctx.reply('You have options to proceed', { reply_markup: menu });
    });   

bot.use(menu);
bot.command('news', async (ctx) => {
    news = (await getNewsData()) || [];
    await ctx.reply(`I received ${news.length} news`);
    await ctx.reply('You have options to proceed', { reply_markup: menu });
});
// bot.command('menu', async (ctx) => {
//     await ctx.reply('Here is your menu', { reply_markup: menu });
// });
bot.start();
bot.catch((error) => {
    console.dir(error);
});
