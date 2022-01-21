import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddFunctionComponent } from './components/add-function/add-function.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SearcherComponent } from './components/searcher/searcher.component';

const routes: Routes = [
  {path:'', component: SearcherComponent},
  {path:'add_function', component: AddFunctionComponent},
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
