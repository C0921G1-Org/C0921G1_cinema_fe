import {SeatType} from './SeatType';
import {ShowTime} from './ShowTime';

export class SelectedSeat {
  id: number;
  bookingDate: string;
  seatPosition: number;
  status: number;
  seatType: SeatType;
}
