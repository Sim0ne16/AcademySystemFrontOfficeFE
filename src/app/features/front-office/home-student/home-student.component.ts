import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StudentService} from 'src/app/core/services/front-office/student.service';
import {Student} from "../../../shared/models/StudentModel";
import {Academy} from "../../../shared/models/AcademyModel";
import {pulseAnimation,} from 'angular-animations';


@Component({
    selector: 'app-home-student',
    templateUrl: './home-student.component.html',
    styleUrls: ['./home-student.component.scss'],
    animations: [ pulseAnimation({ anchor: 'pulse' })]
})
export class HomeStudentComponent implements OnInit {

    isModify : boolean = false
    formStudent !: FormGroup
    student !: Student
    //Questo valore appartiene all'user-trend ma serve anche qua per l'ngSwitch
    personalTrendAverageValue : number = 8

    animationState = false;
    animationWithState = false;

    constructor(private fb: FormBuilder,
                private studentService: StudentService) {

    }

    async ngOnInit() {
        //Questo id sarà in realtà poi preso dalla barra url tramite Snapshot di ActivatedRoute ex -> home-student/1  ->  dove 1 rappresenta l'id
        await this.studentService.getStudentById(1).then(r => this.student = r).then(() =>
            this.formStudent = this.fb.group({
                id: [this.student.id],
                name: [this.student.name, Validators.required],
                lastName: [this.student.lastName, Validators.required],
                dateOfBirth: [this.student.dateOfBirth, Validators.required],
                email: [this.student.email, Validators.email],
                urlImage: [this.student.urlImage, Validators.required],
                academyName: [this.student.academy.name],
                academyStartDate: [this.student.academy.startDate],
                academyEndDate: [this.student.academy.endDate],
            }))
    }


    putStudent() {
        //Da sostituire con una modale/toast (?)
        let modify = confirm("Vuoi veramente modificare?")

        if (modify) {
            //Qui specifico tutto i campi ma una volta collegato al BE di spring mi basterà passare anche solo l'id
            let modifiedAcademy: Academy = {
            'id': this.student.academy.id,
            'name': this.student.academy.name,
            'startDate': this.student.academy.startDate,
            'endDate': this.student.academy.endDate,
        }
        let modifiedStudent: Student = {
            'id': this.student.id,
            'name': this.formStudent.value['name'],
            'lastName': this.formStudent.value['lastName'],
            'dateOfBirth': this.formStudent.value['dateOfBirth'],
            'email': this.formStudent.value['email'],
            'password': this.formStudent.value['password'],
            'academy': modifiedAcademy,
            'urlImage': this.formStudent.value['urlImage'],
        }

        this.studentService.putStudent(modifiedStudent).then(() => this.studentService.getStudentById(1).then(r => this.student = r)).then(() => this.isModify = false )

    }
    }

    animate() {
        this.animationState = false;
        setTimeout(() => {
            this.animationState = true;
            this.animationWithState = !this.animationWithState;
        }, 1);
    }



    editProfile() {
        this.isModify = true
    }

    goBack() {
        this.isModify = false
    }
}

