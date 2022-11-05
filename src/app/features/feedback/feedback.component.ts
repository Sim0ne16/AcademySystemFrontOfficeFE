import { FeedbackService } from '../../core/services/feedback.service';
import { Student } from '../../shared/models/StudentModel';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators,FormGroup } from '@angular/forms';
import { StudentService } from 'src/app/core/services/student.service';
import { Feedback } from 'src/app/shared/models/FeedbackModel';
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {



  formFeedback !: FormGroup
  //Questo student in questo caso lo popoliamo ogni volta con delle chiamate Http
  // In un caso ideale abbiamo il valore già salvato in un uno store
  student !: Student

  constructor(private fb:FormBuilder,
              private studentService:StudentService,
              private feedbackService:FeedbackService,
              private datePipe:DatePipe
    ) {
   this.formFeedback = this.fb.group({
    morningEnergyVote : ['',Validators.required],
    morningHappinessVote : ['',Validators.required],
    doneExerciseVote : ['',Validators.required],
    eveningEnergyVote :['',Validators.required],
    eveningHappinessVote :['',Validators.required],
    comprehensionVote :['',Validators.required],
    suggestions :['',Validators.required],

   })


  }

  ngOnInit(): void {
    this.studentService.getStudentById(1).then(r => this.student = r)
  }


  insertFeedback() {

    let insert = confirm('Vuoi inviare il tuo feedback?')

      let today =  this.datePipe.transform(new Date(),'yyyy-MM-dd')

    if(insert && today){

    let feedback : Feedback = {
      // Id viene assegnato automaticamente
      'id':0,
      'date':  today ,
      'student' : this.student,
       'comprehensionVote' : this.formFeedback.value['comprehensionVote'],
       'doneExerciseVote' : this.formFeedback.value['doneExerciseVote'],
       'eveningEnergyVote' : this.formFeedback.value['eveningEnergyVote'],
       'morningEnergyVote' : this.formFeedback.value['morningEnergyVote'],
       'eveningHappinessVote' : this.formFeedback.value['eveningHappinessVote'],
       'morningHappinessVote' : this.formFeedback.value['morningHappinessVote'],
       'suggestions' : this.formFeedback.value['suggestions'],


        }

        console.log(feedback)
  //  this.feedbackService.insertFeedback(feedback).then()
  }
    }



}
