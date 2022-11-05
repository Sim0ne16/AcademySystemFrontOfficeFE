import {Student} from "./StudentModel";

export interface Feedback{
    id: number,
    date : string,
    student : Student,

    morningEnergyVote : number,
    morningHappinessVote : number,
    doneExerciseVote : number,
    eveningEnergyVote : number,
    eveningHappinessVote : number,
    comprehensionVote : number,
    suggestions : string

}
