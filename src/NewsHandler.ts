import { fetch } from 'undici';
import { ResponseType } from './types';
import { formatDate } from './helpers';

async function fetchNews() {
  const res = await fetch(
    `https://min-api.cryptocompare.com/data/v2/news/?lang=EN&api_key=${process.env.API_KEY}`
  );
  return await res.json();
}
export async function getNewsData() {
  try {
    const mainData = (await fetchNews()) as ResponseType;
    return mainData.Data.map(({ published_on, url: rawUrl, title }) => {
      return {
        title,
        creationTime: formatDate(new Date(published_on * 1000)),
        url: new URL(rawUrl).href,
      };
    });
  } catch (error) {
    console.error(error);
  }
}
