import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-graficodona',
  templateUrl: './graficodona.component.html',
  styles: []
})
export class GraficodonaComponent implements OnInit {

  @Input() public doughnutChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  @Input() public doughnutChartData: number[] = [350, 450, 100];
  @Input() public doughnutChartType: string = 'doughnut';
  @Input() public titulo: string = 'Gráfica';

  constructor() { }

  ngOnInit() {
  }

}
