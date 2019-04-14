import * as fs from 'fs';
import { IResult } from 'src/interface';

/**
 * Read file in utf8 and clear the text
 * @param {string} path 
 */
export const readFile = async (path: string): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    fs.readFile(path, 'utf8', function (err, data) {
      if (err) reject(err);
      resolve(data.replace(/(?:\\[rn])+/g, "").replace(/[^a-zA-Z0-9-.<>="&/,()à ]/g, ''));
    });
  });
};

/**
 * Create a json file
 * @param {string} path 
 * @param {IResult} json 
 */
export const writeFile = async (path: string, json: IResult): Promise<boolean> => {
  return new Promise<boolean>((resolve, reject) => {
    fs.writeFile(path, JSON.stringify(json), 'utf8', (err) => {
      if (err) reject(err);
      resolve(true);
    });
  });
};