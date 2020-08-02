import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ChartsModule } from 'ng2-charts';

import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from '../dashboard/dashboard-routing.module';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { ProfitComponent } from './profit.component';
import { StatisticComponent } from './statistic/statistic.component';
import { DetailComponent } from './detail/detail.component';
import { ProfitSortPipe } from '../pipes/profit-sort.pipe';


@NgModule({
    declarations: [
        DashboardComponent,
        ProfitComponent,
        StatisticComponent,
        DetailComponent,
        ProfitSortPipe
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        DashboardRoutingModule,
        ChartsModule,
        SharedModule
    ]
})
export class ProfitModule { }
