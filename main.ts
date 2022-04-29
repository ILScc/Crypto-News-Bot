import { fetch } from  'undici' ;
import { ResponseType } from './types';
import { formatDate } from './helpers';
import { Telegraf } from 'telegraf';
import type { NewsFormat } from './types';

const API_KEY = '088535a8670f925a47853a2ec672d91f9425240c0c3d2883b5cd40d57b9ef8d6' ;
const BOT_TOKEN = '5360109659:AAGwqfPOimT-bAHiFnFDhXhd5kFR-rE_L20';


const bot = new Telegraf(BOT_TOKEN);
bot.command('getnews', async (ctx) => {
    const news: NewsFormat[] = await getNewsData() || [];
    news.forEach((news) => ctx.reply(JSON.stringify(news)));
});
bot.launch();

async function fetchNews() {
    const res = await fetch(`https://min-api.cryptocompare.com/data/v2/news/?lang=EN&api_key=${API_KEY}`);
    const news = await res.json();
    return news;
}
async function getNewsData(){
    try{
        const mainData = await fetchNews() as ResponseType;
        const neededNewsData = mainData.Data.map(({ published_on, url:rawUrl, title }) => {
            return {
                title,
                creationTime: formatDate(new Date(published_on * 1000)),
                url: new URL(rawUrl).href
            };
        });
        return neededNewsData.slice(0,5);
    }catch(error){
        console.error(error);
    }
    
}
