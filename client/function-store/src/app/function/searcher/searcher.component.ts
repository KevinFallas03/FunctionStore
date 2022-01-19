import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FunctionService } from '../function.service';
@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.css']
})
export class SearcherComponent implements OnInit {
  all_functions:any = [{}];
  constructor(
    private _functionService: FunctionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.get();
  }
  get(){
    this._functionService.getAll().subscribe(
      data => {
        this.all_functions = data
      }
    );
  }
}
