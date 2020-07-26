
import { Routes, RouterModule } from '@angular/router';

import { ProfitComponent } from '../profit/profit.component';
import { StatisticComponent } from '../profit/statistic/statistic.component';
import { DetailComponent } from '../profit/detail/detail.component';

export const dashboardRoutes: Routes = [
    { path: '', component: StatisticComponent },
    { path: 'profit', component: ProfitComponent },
    { path: 'detail', component: DetailComponent },
];
