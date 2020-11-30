import {Insurance} from './insurance';

export class Car {
  id: number;
  vin: number;
  uid: number;
  make: string;
  model: string;
  miles: number;
  year: number;
  carphoto: string;
  color: string;
  insurance: Insurance;
}
