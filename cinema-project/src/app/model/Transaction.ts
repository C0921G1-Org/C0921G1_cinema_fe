import {Member} from './Member';
import {Showtime} from './showtime';

export class Transaction {
  id?: number;
  code?: string;
  transactionalDate?: string;
  ticketStatus?: string;
  showTime?: Showtime;
  member?: Member;
 checkAcceptTicket?:number;
 pointGained?:number;
pointUsed?:number;
}
