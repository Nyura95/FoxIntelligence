import "./lib/env";

import { readFile, writeFile } from './helpers';
import { IResult, ITrips, IRoundTrips, IPrice, IDateTravel } from './interface';
import { OuiSncf } from "./ouisncf/ouisncf";

const start = async () => {
  const json: IResult = { status: 'nok', result: {} };
  if (!process.env.FILE || !process.env.RESULT_FILE) {
    throw "Error in your configuration !";
  }

  const ouisncf = new OuiSncf(await readFile(process.env.FILE));
  const columns = ouisncf.getColumns;


  for (let i = 0; i < columns.length; i++) {
    const column = columns[i];

    const prices: IPrice[] = [];
    const trips: ITrips[] = [];
    const roundTrips: IRoundTrips[] = [];
    const date: IDateTravel[] = [];

    const productHeader = column.blockCommand.getProductHeader;
    for (let i = 0; i < productHeader.length; i++) {
      const header = productHeader[i];
      prices.push({ value: parseFloat(header.getPrice.replace(',', '.')) });

      if (!header.last()) {
        const originAndDest = header.getOriginAndDest;
        date.push(column.blockTravel.getDate(originAndDest.origin, originAndDest.destination));
      }
    }

    const commandDetails = column.blockCommand.getProductDetails;
    let y = 0;
    for (let i = 0; i < commandDetails.length; i++) {
      roundTrips.push({
        type: commandDetails[i].getType,
        date: date[y][commandDetails[i].getType === "Aller" ? 'to' : 'return'],
        trains: commandDetails[i].getTrains
      });

      if (commandDetails[i].getType === "Retour") {
        y++;
      }
    }

    trips.push({
      code: column.blockTravel.getFileReference,
      name: column.blockTravel.getNameReference,
      details: {
        price: parseFloat(column.blockPayment.getMainPrice.replace(',', '.')),
        roundTrips: roundTrips
      }
    });

    json.result = { trips, custom: { prices } };
  }

  json.status = 'ok';

  writeFile(process.env.RESULT_FILE, json);
};

start();
