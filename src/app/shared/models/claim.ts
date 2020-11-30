import {ClaimImage} from './claimImage';

export class Claim {
  id: number;
  uid: number;
  insurid: number;
  ticket: string;
  ticketdate: Date;
  detail: string;
  claimImages: ClaimImage[];
  emerphone: string;
}
