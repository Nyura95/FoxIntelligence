import { IColumn } from "./interface";
import { load } from "../helpers";
import { Command } from "./block/command";
import { Travel } from "./block/travel";
import { Payment } from "./block/payment";
import { Selector } from "./selector";


export class OuiSncf extends Selector {
  private ouisncf: Cheerio;

  constructor(ouisncf: string) {
    super(load(ouisncf));
    this.ouisncf = this.$('#main-column');
  }

  /**
   * Get principal columns
   */
  public get getColumns(): IColumn[] {
    const colums: IColumn[] = [];
    for (let i = 0; i < this.ouisncf.length; i++) {
      colums.push({
        blockCommand: new Command(this.$(this.ouisncf[i]).find('#block-command')),
        blockTravel: new Travel(this.$(this.ouisncf[i]).find('#block-travel')),
        blockPayment: new Payment(this.$(this.ouisncf[i]).find('#block-payment'))
      });
    }
    return colums;
  }
}