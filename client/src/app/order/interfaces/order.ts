import { OrderPosition } from "./orderPosition";

export interface Order {
  date?: Date;
  order?: Number;
  user?: String;
  list: OrderPosition[];
  _id?: string;
}
