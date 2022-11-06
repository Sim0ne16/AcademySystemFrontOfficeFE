import { Feedback } from '../../../shared/models/FeedbackModel';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Server } from 'src/app/shared/consts/Server';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http:HttpClient) { }


  async insertFeedback(feedback:Feedback){
   await lastValueFrom(this.http.post(`${Server.Address}/Feedback`,feedback))
  }

}
