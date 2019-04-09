export interface IResult {
  status: "ok" | "nok";
  result: IResultCheerio;
}

export interface IResultCheerio {
  trips: ITrips[];
  custom: ICustom;
}

export interface ITrips {
  code: string;
  name: string;
  details: IDetails[];
}

export interface IDetails {
  price: number;
  roundTrips: IRoundTrips[];
}

export interface IRoundTrips {
  type: "Aller" | "Retour";
  date: string;
  trains: ITrain[];
}

export interface IPassager {
  type: string;
  age: string;
}

export interface ITrain {
  departureTime: string;
  departureStation: string;
  arrivalTime: string;
  arrivalStation: string;
  type: "TGV";
  number: string;
  passengers?: IPassager[];
}

export interface ICustom {
  prices: IPrices[];
}

export interface IPrices {
  value: number;
}