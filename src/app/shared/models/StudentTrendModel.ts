import {Student} from "./StudentModel";
import {KpiHard} from "./KpiHardType";
import {KpiSoft} from "./KpiSoftType";
import { Module } from "./ModuleModel";

export interface StudentTrend {
    id : number,
    student : Student,
    module : Module,
    kpiHard : KpiHard[],
    kpiSoft : KpiSoft[]

    //Da collegare anche il feedback

}
