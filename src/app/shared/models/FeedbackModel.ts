import {Student} from "./StudentModel";

export interface Feedback{
    id: number,
    date : Date,
    student : Student,

    morningEnergyVote : number,
    morningHappinessVote : number,
    doneExerciseVote : number,
    eveningEnergyVote : number,
    eveningHappinessVote : number,
    comprehensionVote : number,
    suggestions : string

}
