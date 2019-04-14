export type IType = "Aller" | "Retour" | "N/C";

export interface IHeaderOriginAndDest {
  origin: string;
  destination: string;
}

export interface IDateTravel {
  to: string;
  return: string;
}

export interface IResult {
  status: "ok" | "nok";
  result: IResultCheerio | {};
}

export interface IResultCheerio {
  trips: ITrips[];
  custom: ICustom;
}

export interface ITrips {
  code: string;
  name: string;
  details: IDetails;
}

export interface IDetails {
  price: number;
  roundTrips: IRoundTrips[];
}

export interface IRoundTrips {
  type: IType;
  date: string;
  trains: ITrain[];
}

export interface IPassenger {
  type: string;
  age: string;
}

export interface ITrain {
  departureTime: string;
  departureStation: string;
  arrivalTime: string;
  arrivalStation: string;
  type: string;
  number: string;
  passengers?: IPassenger[];
}

export interface ICustom {
  prices: IPrice[];
}

export interface IPrice {
  value: number;
}