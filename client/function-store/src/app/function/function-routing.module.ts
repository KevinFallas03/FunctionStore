import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearcherComponent } from './searcher/searcher.component';

const routes: Routes = [
  { path: 'searcher', component: SearcherComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FunctionRoutingModule { }
