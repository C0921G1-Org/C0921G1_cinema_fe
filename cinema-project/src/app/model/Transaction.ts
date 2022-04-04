import {Member} from './Member';

import {Film} from './Film';
import {FilmType} from './Film-type';
import {SelectedSeat} from './SelectedSeat';
import {ShowTime} from "./ShowTime";



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

