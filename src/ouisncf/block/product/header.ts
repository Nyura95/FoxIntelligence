import { IHeaderOriginAndDest } from "../../../interface";

export class Header {
  constructor(private header: Cheerio) { }

  /**
   * Get price header
   */
  public get getPrice() {
    const find = this.header.find('td').last().html();
    return find ? find.trim() : 'N/C';
  }

  /**
   * Get origin and desitionation header
   */
  public get getOriginAndDest(): IHeaderOriginAndDest {
    const headerOriginAndDest = { origin: 'N/C', destination: 'N/C' };
    const od = this.header.find('.od').html();
    if (od) {
      headerOriginAndDest.origin = od.substr(0, od.indexOf('<img')).trim();
      headerOriginAndDest.destination = od.substr(od.indexOf('">') + 2, od.length).trim();
    }
    return headerOriginAndDest;
  }

  /**
   * Check if is the last header
   */
  public last(): boolean {
    return this.header.find('.amount').html() !== null;
  }
}