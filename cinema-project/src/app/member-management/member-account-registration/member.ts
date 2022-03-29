import {City} from "./city";
import {District} from "./district";
import {Ward} from "./ward";

export interface Member {

 // id: string;
 image:string;
 name:string;
 phone:string;
 gender:number;
 email:string;
 password:string;
 confirmPassword: string;
 identityNumber: string;
 ward: Ward;
 address:string;
 dateOfBirth: string;

}
