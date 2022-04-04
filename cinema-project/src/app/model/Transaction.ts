import {Member} from './Member';
import {ShowTime} from './showtime';

export class Transaction {
  id?: number;
  code?: string;
  transactionalDate?: string;
  ticketStatus?: string;
  showTime?: ShowTime;
  member?: Member;
 checkAcceptTicket?:number;
 pointGained?:number;
pointUsed?:number;
}
