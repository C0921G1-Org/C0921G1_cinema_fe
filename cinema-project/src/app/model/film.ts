import {FilmType} from "./film-type";

export class Film {
  id: number;
  name: string;
  duration: string;
  startDate: string;
  endDate: string;
  actor: string;
  director: string;
  studio: string;
  image: string;
  trailer: string;
  version: string;
  flagDelete: number;
  filmType: FilmType;
// showTimes: ShowTime;

  constructor() {
  }


}
