import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { dashboardRoutes } from './dashboard.routers';
// import { AuthGuard } from '../services/auth.guard';

const dashRoutes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        children: dashboardRoutes,
        // canActivate: [AuthGuard]
    }
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(dashRoutes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
