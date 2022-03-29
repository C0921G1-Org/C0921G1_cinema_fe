import {Member} from './Member';
import {ShowTime} from './ShowTime';
import {Film} from './Film';
import {FilmType} from './Film-type';

export class Transaction{
  id: number;
  code: string;
  transactionalDate: string;
  ticketStatus: string;
  member: Member;
  showTime: ShowTime;
  film: Film;
  filmType: FilmType;
}

