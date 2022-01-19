import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FunctionService } from './function.service'

import { FunctionRoutingModule } from './function-routing.module';

import { SearcherComponent } from './searcher/searcher.component';

import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    SearcherComponent
  ],
  imports: [
    CommonModule,
    FunctionRoutingModule,
    MatCardModule,
    MatButtonModule
  ],
  providers: [FunctionService],
})
export class FunctionModule { }
