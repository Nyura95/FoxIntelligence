import { Header } from "./product/header";
import { Selector } from "../selector";
import { Detail } from "./product/detail";

export class Command extends Selector {
  constructor(private command: Cheerio) {
    super();
  }

  /**
   * Get all pruduct Header in the file
   * @returns {IPrice[]}
   */
  public get getProductHeader(): Header[] {
    const headers: Header[] = [];
    const productHeaders = this.command.find('.product-header');
    for (let i = 0; i < productHeaders.length; i++) {
      headers.push(new Header(this.$(productHeaders[i])));
    }
    return headers;
  }

  /**
   * Get all pruduct detail in the file
   * @returns {Detail[]}
   */
  public get getProductDetails(): Detail[] {
    const details: Detail[] = [];
    const productDetails = this.command.find('.product-details');
    for (let i = 0; i < productDetails.length; i++) {
      details.push(new Detail(this.$(productDetails[i])));
    }
    return details;
  }
}