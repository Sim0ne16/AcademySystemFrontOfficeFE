import {Component, OnInit} from '@angular/core';
import {ChartConfiguration} from 'chart.js';
import {Location} from "@angular/common";
import {StudentTrend} from "../../../shared/models/StudentTrendModel";
import {TrendService} from "../../../core/services/front-office/trend.service";

@Component({
    selector: 'app-user-trend',
    templateUrl: './user-trend.component.html',
    styleUrls: ['./user-trend.component.scss']
})
export class UserTrendComponent implements OnInit {


    // Chart HardSkill

    public studentTrend !: StudentTrend[]
    public labelsName: string[] = []
    public personalKpiHard: number[] = []
    public personalTrendAverageValue = 0
    public personalTrend !: number[]
    public barChartData !: ChartConfiguration<'bar'>['data']

    // Chart SoftSkill

    public personalKpiSoft: number[] = []
    public barChartData2 !: ChartConfiguration<'bar'>['data']

    //Parametri Comuni

    public barChartLegend = true;
    public barChartPlugins = [];
    public barChartOptions: ChartConfiguration<'bar'>['options'] = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {},
            y: {
                min: 0,
                max: 10,
            }
        },
    }

    constructor(private location: Location,
                private trendService: TrendService) {
    }

    async ngOnInit() {
        let hardSkillRating = 0
        let n = 0
        let activeListening = 0
        let formalization = 0
        let problemSolving = 0
        let teamWork = 0
        let objectOrientation = 0
        //Questo 1 va sempre preso dalla barra indirizzo
        await this.trendService.getStudentTrendByIdStudent(1).then(r => this.studentTrend = r)
            // Prendo i nomi di ogni modulo dall'insieme di studentTrend
            .then(() => {
                this.studentTrend.forEach(kpi => this.labelsName.push(kpi.module.name))
            })
            // Calcolo il valore medio per ogni KpiHard !
            .then(() => {
                this.studentTrend.forEach(kpi => kpi.kpiHard.forEach(value => {
                    n += 1
                    hardSkillRating += value.rating
                    if (n == kpi.kpiHard.length) {
                        hardSkillRating = hardSkillRating / kpi.kpiHard.length
                        this.personalKpiHard.push(hardSkillRating)
                        hardSkillRating = 0
                        n = 0
                    }
                }))
            })
            .then(() => this.personalKpiHard.forEach(value => {
                n += 1
                hardSkillRating += value
                if (n == this.personalKpiHard.length) {
                    {
                        this.personalTrendAverageValue = hardSkillRating / this.personalKpiHard.length
                        hardSkillRating = 0
                        n = 0
                    }
                }
            }))
            .then(() => this.barChartData = {
                labels: this.labelsName,
                datasets: [
                    {
                        label: 'HarSkill',
                        data: this.personalKpiHard,
                        backgroundColor: ["#2b8038", "#a19d2d", "#a85f0c"],
                        hoverBackgroundColor: ["#40c254", "#cfc92b", "#d6780d"]
                    }
                ]
            })
            //Grafico Soft
            .then(() => this.studentTrend.forEach(kpi => kpi.kpiSoft.forEach(value => {
                n += 1
                activeListening += value.activeListeningRating
                formalization += value.formalizationRating
                problemSolving += value.problemSolvingRating
                teamWork += value.teamWorkingRating
                objectOrientation += value.objectiveOrientationRating
                if (n == kpi.kpiSoft.length) {
                    this.personalKpiSoft.push(activeListening / kpi.kpiSoft.length)
                    this.personalKpiSoft.push(formalization / kpi.kpiSoft.length)
                    this.personalKpiSoft.push(problemSolving / kpi.kpiSoft.length)
                    this.personalKpiSoft.push(teamWork / kpi.kpiSoft.length)
                    this.personalKpiSoft.push(objectOrientation / kpi.kpiSoft.length)
                    n = 0
                }
            })))
            .then(() => this.barChartData2 = {
                labels: ['Ascolto Attivo', 'Formalizzazione', 'Problem Solving', 'Team Working', 'Orientamento ad obbiettivi'],
                datasets: [
                    {
                        label: 'SoftSkill',
                        data: this.personalKpiSoft,
                        backgroundColor: ["#2b8038", "#a19d2d", "#a85f0c", "#6a1d82", "#821a2b"],
                        hoverBackgroundColor: ["#40c254", "#cfc92b", "#d6780d", "#ae2bd6", "#e62e4c"]
                    }
                ]
            })


    }

    goBack() {
        this.location.back()
    }
}
