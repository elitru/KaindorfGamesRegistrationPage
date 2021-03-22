import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { TournamentsComponent } from './components/tournaments/tournaments.component';
import { AuthGuard } from './guards/auth.guard';
import { ReadOnlyGuard } from './guards/read-only.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [ ReadOnlyGuard ]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [ ReadOnlyGuard ]
  },
  {
    path: 'tournaments',
    component: TournamentsComponent,
    canActivate: [ AuthGuard ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }