import axios from 'axios';
import path from './path'

export default async function generateSitemap() {
  return {
    hostname: process.env.NUXT_ENV_BASE_URL,
    gzip: true,
    routes: async () => getRoutes(),
  }
}

async function getRoutes() {
  const sitemapResponse = await axios.get(path.join(process.env.NUXT_ENV_CMS_BASE_URL, 'sitemap'));
  const sitemapItems = sitemapResponse.data;
  let routes = [];
  
  Object.entries(sitemapItems).forEach(object => {
    const type = object[0];
    routes = [...routes, ...sitemapItems[type]]
  });

  return routes;
}
