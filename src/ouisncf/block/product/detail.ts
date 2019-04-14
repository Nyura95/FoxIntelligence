
import { IType, ITrain, IPassenger } from "../../../interface";
import { Selector } from "../../selector";

export class Detail extends Selector {
  constructor(private detail: Cheerio) {
    super();
  }

  /**
   * Get type travel
   * @returns {IType}
   */
  public get getType(): IType {
    const find = this.detail.find('.travel-way').html();
    return find ? find.trim() as IType : 'N/C';
  }

  /**
   * Get all infos of train
   * @return {ITrain[]}
   */
  public get getTrains(): ITrain[] {
    const trains: ITrain[] = [];

    const departureTime = this.detail.find('.origin-destination-hour').html();
    const arrivalStation = this.detail.find('.origin-destination-station ').html();
    const arrivalTime = this.detail.find('.origin-destination-border').filter('.origin-destination-hour').html();
    const departureStation = this.detail.find('.origin-destination-border').filter('.origin-destination-station').html();
    const number = this.detail.find('.segment').next().html();
    const type = this.detail.find('.segment').html();

    const passengers: IPassenger[] = [];

    const typologys = this.detail.parent().find('.passengers').first().find('.typology');
    for (let i = 0; i < typologys.length; i++) {
      const typology = this.$(typologys[i]).html();
      const fareDetails = this.$(typologys[i]).parent().find('.fare-details').first().html();
      if (typology && fareDetails) {
        const test = typology.split('<br>');
        if (test.length > 1) {
          passengers.push({
            age: test[1].replace('&#xE0;', 'à').trim(),
            type: fareDetails.indexOf('non échangeable') != -1 ? 'non échangeable' : 'échangeable'
          });
        }
      }
    }

    trains.push({
      departureTime: departureTime ? departureTime.replace('h', ':').trim() : 'N/C',
      arrivalStation: arrivalStation ? arrivalStation.trim() : 'N/C',
      arrivalTime: arrivalTime ? arrivalTime.replace('h', ':').trim() : 'N/C',
      departureStation: departureStation ? departureStation.trim() : 'N/C',
      number: number ? number.trim() : 'N/C',
      type: type ? type.trim() : 'N/C',
      passengers: passengers
    });
    return trains;
  }

}