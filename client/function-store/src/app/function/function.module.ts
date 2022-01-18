import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FunctionService } from './function.service'

import { FunctionRoutingModule } from './function-routing.module';

import { SearcherComponent } from './searcher/searcher.component';

@NgModule({
  declarations: [
    SearcherComponent
  ],
  imports: [
    CommonModule,
    FunctionRoutingModule
  ],
  providers: [FunctionService],
})
export class FunctionModule { }
