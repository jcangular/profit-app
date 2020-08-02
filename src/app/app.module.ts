import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

// NgRx
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appReducers, devtoolsOptions } from './app.reducer';

// Angular Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';

import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';


import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfitComponent } from './profit/profit.component';
import { StatisticComponent } from './profit/statistic/statistic.component';
import { DetailComponent } from './profit/detail/detail.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { ProfitSortPipe } from './pipes/profit-sort.pipe';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        DashboardComponent,
        ProfitComponent,
        StatisticComponent,
        DetailComponent,
        FooterComponent,
        NavbarComponent,
        SidebarComponent,
        ProfitSortPipe
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        ChartsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireAuthModule,
        StoreModule.forRoot(appReducers),
        StoreDevtoolsModule.instrument(devtoolsOptions)
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
