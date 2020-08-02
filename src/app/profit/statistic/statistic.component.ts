import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppStateWithProfit } from '../profit.reducer';
import { Subscription } from 'rxjs';
import { Profit } from '../../models/profit.model';

import { ChartType } from 'chart.js';
import { Label, MultiDataSet, Color } from 'ng2-charts';

@Component({
    selector: 'app-statistic',
    templateUrl: './statistic.component.html',
    styles: [
    ]
})
export class StatisticComponent implements OnInit, OnDestroy {

    ingresos: number;
    totalIngresos: number;
    egresos: number;
    totalEgresos: number;
    itemsSubs: Subscription;

    readonly doughnutChartLabels: Label[] = ['Egresos', 'Ingresos'];
    labelsColor: Color[] = [{ backgroundColor: 'green' }, { backgroundColor: 'red' }];
    doughnutChartData: MultiDataSet = [];
    readonly chartType: ChartType = 'doughnut';

    constructor(
        private store: Store<AppStateWithProfit>
    ) {
        this.statReset();
    }

    ngOnInit(): void {
        this.itemsSubs = this.store.select('profit')
            .subscribe(({ items }) => this.generateStatistic(items));
    }

    ngOnDestroy(): void {
        this.itemsSubs.unsubscribe();
    }

    /**
     * Reinicia los valores de los ingresos y egresos.
     */
    private statReset(): void {
        this.totalEgresos = 0;
        this.totalIngresos = 0;
        this.egresos = 0;
        this.ingresos = 0;
    }

    generateStatistic(items: Profit[]): void {
        this.statReset();
        items.forEach(item => {
            if (item.type === 'ingreso') {
                this.totalIngresos += item.amount;
                this.ingresos++;
            } else {
                this.totalEgresos += item.amount;
                this.egresos++;
            }
        });
        this.doughnutChartData = [[this.totalEgresos, this.totalIngresos]];
    }

}
