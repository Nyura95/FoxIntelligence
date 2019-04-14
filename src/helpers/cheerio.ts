import * as cheerio from 'cheerio';

/**
 * Load the file with cherrio
 * @param {string} html 
 * @return {CheerioStatic}
 */
export const load = (html: string): CheerioStatic => cheerio.load(html);
