import {ShowTime} from './ShowTime';
import {Member} from './Member';

export class Transaction {
  id?: number;
  code?: string;
  transactionalDate?: string;
  ticketStatus?: string;
  showTime?: ShowTime;
  member?: Member;

}
