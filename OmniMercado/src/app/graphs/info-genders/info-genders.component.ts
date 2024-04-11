import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { Utils } from '@angular/core';

@Component({
  selector: 'app-info-genders',
  templateUrl: './info-genders.component.html',
  styleUrls: ['./info-genders.component.css']
})
export class InfoGendersComponent implements OnInit {

  public chart: Chart;

  ngOnInit(): void {

    const DATA_COUNT = 5;
    const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 100 };

    const data = {
      labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
      datasets: [
        {
          label: 'Dataset 1',
          data: Utils.numbers(NUMBER_CFG),
          backgroundColor: Object.values(Utils.CHART_COLORS),
        }
      ]
    };


    this.chart = new Chart('chart', {
      type: 'line',
      data
    });



  }

}
