import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FunctionService } from '../../services/functionService/function.service';

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.css']
})
export class SearcherComponent implements OnInit {
  all_functions:any = [{}];
  constructor(
    private _functionService: FunctionService,
    private sanitizer:DomSanitizer
  ) { }

  ngOnInit(): void {
    this.get();
    
  }
  getColoredCode(func){
    this._functionService.getColoredCode(func.js_code).subscribe(
      data => {
        func.html_colored_code = this.sanitizer.bypassSecurityTrustHtml(data);
      }
    );
  }
  showMsg(text){
    console.log(text);
  }
  get(){
    this._functionService.getAll().subscribe(
      data => {
        this.all_functions = data;
        this.all_functions.forEach(func => {
          this.getColoredCode(func);
        });
      }
    );
  }
}
