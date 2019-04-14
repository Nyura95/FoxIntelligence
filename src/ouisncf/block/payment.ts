export class Payment {
  constructor(private payment: Cheerio) { }

  /**
   * Get main price from the .very-important class
   */
  public get getMainPrice(): string {
    const find = this.payment.find('.very-important').html();
    return find ? find.trim() : 'N/C';
  }
}