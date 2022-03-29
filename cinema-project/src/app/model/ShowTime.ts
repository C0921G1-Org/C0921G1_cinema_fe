import {Film} from './Film';
import {Transaction} from './Transaction';

export class ShowTime{
  id: number;
  date: string;
  name: string;
  film: Film;
  transaction: Transaction;
}
