import { fetch } from 'undici';
const API_KEY = '088535a8670f925a47853a2ec672d91f9425240c0c3d2883b5cd40d57b9ef8d6';

async function fetchJson() {
    const res = await fetch(`https://min-api.cryptocompare.com/data/v2/news/?lang=EN&api_key=${API_KEY}`);
    const json = await res.json();
    console.log(json);
}
fetchJson();