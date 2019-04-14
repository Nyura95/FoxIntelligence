// tslint:disable-next-line: variable-name
let _selector: CheerioStatic;

export class Selector {
  constructor(selector: CheerioStatic | null = null) {
    if (selector != null) {
      _selector = selector;
    }
  }
  public get $(): CheerioStatic {
    return _selector;
  }
}