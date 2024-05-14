import { HeaderComponent } from './header/header.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ContentComponent } from './content/content.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SamplepageComponent } from './samplepage/samplepage.component';
import { ConnectionComponent } from './connection/connection.component';
import { QueryComponent } from './query/query.component';
import { DataListComponent } from './data-list/data-list.component';
import { DetailDataComponent } from './detail-data/detail-data.component';
import { ApiComponent } from './api/api.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },  // Điều hướng trang mặc định tới /login
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'dashboard', component: DashboardComponent},  // Bảo vệ trang Dashboard
    { path: 'report', component: SamplepageComponent },
    {path:'connection',component:ConnectionComponent},
    {path:'query',component:QueryComponent},
    {path:'datalist',component:DataListComponent},
    {path:'detaildata',component:DetailDataComponent},
    {path:'api',component:ApiComponent},
];
