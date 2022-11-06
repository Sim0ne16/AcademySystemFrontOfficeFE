import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {lastValueFrom} from "rxjs";
import {Server} from "../../../shared/consts/Server";
import {Student} from "../../../shared/models/StudentModel";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http:HttpClient) {}

   async getStudentById(id:number) {
    return await lastValueFrom(this.http.get<Student>(`${Server.Address}/Student/${id}`))
   }

   async putStudent(student:Student){
      return await lastValueFrom(this.http.put(`${Server.Address}/Student/${student.id}`,student))
   }



}
