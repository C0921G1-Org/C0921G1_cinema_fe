import {Film} from './film';
import {Screen} from './screen';

export class Showtime {
  id: number;
  date: string;
  name: string;
  film: Film;
  screen: Screen;
}
