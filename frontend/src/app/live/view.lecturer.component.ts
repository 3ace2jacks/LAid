import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'view.lecturer',
  templateUrl: './view.lecturer.component.html',
  providers: [],
})

export class LecturerViewComponent {
	public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true,
	scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true,
                    max: 200
                }
            }]
        }
  	};

	public toSlow: string = "too slow";
	public toFast: string = "too fast";
	public barChartLabels: String[] = [this.toSlow, this.toFast];
	public barChartType: string = 'bar';
	public barChartLegend: boolean = true;
	public barChartDataExample: any[] = [backgroundColor: ['rgba(255, 99, 132, 0.2)'],
	{data: [5, 90], label: 'eksampleSet1', 
        }]

}