import {Film} from './Film';
import {Transaction} from './Transaction';
import {Screen} from './Screen';
import {SelectedSeat} from './SelectedSeat';

export class ShowTime{
  id: number;
  date: string;
  name: string;
  film: Film;
  transaction: Transaction;
  screen: Screen;
  selectedSeat: SelectedSeat;
}
