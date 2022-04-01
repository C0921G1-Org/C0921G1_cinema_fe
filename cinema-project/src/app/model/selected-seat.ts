import {SeatType} from './seat-type';
import {Showtime} from './showtime';

export class SelectedSeat {
  id: number;
  bookingDate: string;
  seatPosition: number;
  status: number;
  seatType: SeatType;
  showtime?: Showtime;
}
