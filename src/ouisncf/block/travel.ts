import { Selector } from "../selector";
import { IDateTravel } from "../../interface";

export class Travel extends Selector {
  constructor(private travel: Cheerio) {
    super();
  }

  /**
   * Get name reference on current column
   * @param {Cheerio} column 
   * @returns {string}
   */
  public get getNameReference(): string {
    const find = this.travel.find('.block-pnr').last().find('.pnr-name .pnr-info').html();
    return find ? find.trim() : 'N/C';
  }

  /**
   * Get reference on current column
   * @param {Cheerio} column 
   * @returns {string}
   */
  public get getFileReference(): string {
    const find = this.travel.find('.block-pnr').last().find('.pnr-info').html();
    return find ? find.trim() : 'N/C';
  }

  public getDate(origin: string, destination: string): IDateTravel {
    const dateTravel: IDateTravel = { return: 'N/C', to: 'N/C' };
    const prnSummarys = this.travel.find('.pnr-summary');
    for (let i = 0; i < prnSummarys.length; i++) {
      const prnSummary = this.$(prnSummarys[i]).html();

      if (prnSummary && prnSummary.indexOf(origin) !== -1 && prnSummary.indexOf(destination) !== -1) {
        let find = prnSummary.trim();
        dateTravel.to = new Date(find.substring(find.indexOf('les') + 3, find.indexOf('les') + 20).trim().replace('&#xA0;', '').split('/').reverse().join('-')).toISOString().replace('T', ' ');
        dateTravel.return = new Date(find.substr(find.length - 10, find.length).split('/').reverse().join('-')).toISOString().replace('T', ' ');
      }
    }
    return dateTravel;
  }
}