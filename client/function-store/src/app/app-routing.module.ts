import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SearcherComponent } from './components/searcher/searcher.component';

const routes: Routes = [
  // {path:'functions/sercher', component: SearcherComponent},
  {path:'functions', component: SearcherComponent},
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {path:'', component: HomeComponent, pathMatch: 'full'},
  // { path: 'functions', loadChildren: () => import('./components/function/function.module').then(m => m.FunctionModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
