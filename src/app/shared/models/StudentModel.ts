import {Academy} from "./AcademyModel";

export interface Student {
    id : number ,
    name : string,
    lastName : string,
    dateOfBirth : Date,
    email : string,
    password : string,
    academy : Academy,
    urlImage : string,
}
