import {FeedbackService} from '../../../core/services/front-office/feedback.service';
import {Student} from '../../../shared/models/StudentModel';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {StudentService} from 'src/app/core/services/front-office/student.service';
import {Feedback} from 'src/app/shared/models/FeedbackModel';
import * as moment from "moment";
import {Location} from "@angular/common";

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

    constructor(private fb: FormBuilder,
                private studentService: StudentService,
                private feedbackService: FeedbackService,
                private location : Location
    ) {
        this.formFeedback = this.fb.group({
            morningEnergyVote: ['', Validators.required],
            morningHappinessVote: ['', Validators.required],
            doneExerciseVote: ['', Validators.required],
            eveningEnergyVote: ['', Validators.required],
            eveningHappinessVote: ['', Validators.required],
            comprehensionVote: ['', Validators.required],
            suggestions: ['', Validators.required],

        })


    }

    ngOnInit(): void {
        this.studentService.getStudentById(1).then(r => this.student = r)
    }

    goBack() {
        this.location.back()
    }

    insertFeedback() {

        let insert = confirm('Vuoi inviare il tuo feedback?')

        if (insert) {

            let feedback: Feedback = {
                // Id viene assegnato automaticamente
                'id': 0,
                // Da concordare il tipo di dato da passare al BE sulle Date in generale!
                'date': moment().format("YYYY-MM-DD"),
                'student': this.student,
                'comprehensionVote': this.formFeedback.value['comprehensionVote'],
                'doneExerciseVote': this.formFeedback.value['doneExerciseVote'],
                'eveningEnergyVote': this.formFeedback.value['eveningEnergyVote'],
                'morningEnergyVote': this.formFeedback.value['morningEnergyVote'],
                'eveningHappinessVote': this.formFeedback.value['eveningHappinessVote'],
                'morningHappinessVote': this.formFeedback.value['morningHappinessVote'],
                'suggestions': this.formFeedback.value['suggestions'],


            }

            this.feedbackService.insertFeedback(feedback).then(() => this.goBack())
        }
    }



}
