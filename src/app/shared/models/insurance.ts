import {Car} from './car';

export class Insurance {
  id: number;
  uid: number;
  start_date: Date;
  end_date: Date;
  price: number;
  cars: Car[];
}
