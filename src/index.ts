import * as cheerio from 'cheerio';
import { readFile } from 'fs';

function test() {
  readFile('julie/test.html', 'utf8', function (err, data) {
    if (err) throw err;
    const $ = cheerio.load(data);
  });
}

test();