import { Injectable } from '@angular/core';
import {lastValueFrom} from "rxjs";
import {Server} from "../../../shared/consts/Server";
import {HttpClient} from "@angular/common/http";
import {StudentTrend} from "../../../shared/models/StudentTrendModel";

@Injectable({
  providedIn: 'root'
})
export class TrendService {

  constructor(private http:HttpClient) { }

  async getStudentTrendByIdStudent(id:number){
    return await lastValueFrom(this.http.get<StudentTrend[]>(`${Server.Address}/StudentTrend?student.id=${id}`))
  }

}
