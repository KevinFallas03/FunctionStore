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
  filtered_functions:any = [{}];
  search_filters = [];
  searchEnabled:boolean=false;
  constructor(
    private _functionService: FunctionService,
    private sanitizer:DomSanitizer
  ) { }

  ngOnInit(): void {
    this.get();
    
  }
  onValChange(event){
    this.searchEnabled = true;
    let toggle = event.source;
    if(event.value.includes('quit')){
      this.filtered_functions = this.all_functions;
      let group = toggle.buttonToggleGroup;
      group.value = [];
      this.search_filters = [];
      var f = document.getElementById('filters');
      f.style.transform = 'translateX(-170px)'
      this.searchEnabled = false;
    }else{
      if(event.value.length == 0){
        this.filtered_functions = this.all_functions;
        this.searchEnabled = false;
      }
      this.search_filters = event.value; 
      console.log(event.value);
    }
  }
  showFilters(){
    var f = document.getElementById('filters');
    f.style.transform = 'translateX(470px)'
  }
  getColoredCode(func){
    this._functionService.getColoredCode(func.js_code).subscribe(
      data => {
        func.html_colored_code = this.sanitizer.bypassSecurityTrustHtml(data);
      }
    );
  }
  get(){
    this._functionService.getAll().subscribe(
      data => {
        this.all_functions = data;
        this.all_functions.forEach(func => {
          this.getColoredCode(func);
        });
        this.filtered_functions = this.all_functions;
      }
    );
  }
  filterFunctions(event){
    let inputText = event.currentTarget.value;
    let new_functions = [];
    this.all_functions.forEach(func => {
      this.search_filters.forEach(filter =>{
        console.log(func[filter]);
        console.log(inputText);
        if(func[filter].includes(inputText) && !new_functions.includes(func)){
          new_functions.push(func);
          return;
        };
      })
    });
    this.filtered_functions = new_functions;
  }
}
