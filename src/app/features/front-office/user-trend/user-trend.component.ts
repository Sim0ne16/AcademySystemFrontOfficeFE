import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import {Location} from "@angular/common";

@Component({
  selector: 'app-user-trend',
  templateUrl: './user-trend.component.html',
  styleUrls: ['./user-trend.component.scss']
})
export class UserTrendComponent implements OnInit {

  public barChartLegend = true;
  public barChartPlugins = [];
  //Valori mockati, vanno calcolati
  public personalTrendAverageValue = 7.3
  public academyTrendAverageValue = 6.3

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [ 'Database',"BackEnd","FrontEnd" ],
    datasets: [
        //I dati dovranno essere presi da una entità che restituisce il risultato di un test di uno specifico studente
      { data: [ 6,8,8 ], label: 'Io' },
        //Per l'academy bisognerà prendere tutti i risultati relativi a una academy e fare la media
      { data: [ 7,5,7 ], label: 'Andamento Medio Academy' }
    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false
  };

  constructor(private location:Location) { }

  ngOnInit(): void {
  }

  goBack() {
    this.location.back()
  }
}
