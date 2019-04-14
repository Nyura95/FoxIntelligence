import { Command } from "./block/command";
import { Payment } from "./block/payment";
import { Travel } from "./block/travel";

export interface IColumn {
  blockCommand: Command;
  blockPayment: Payment;
  blockTravel: Travel;
}