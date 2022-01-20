import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FunctionService } from '../../services/functionService/function.service';

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.css']
})
export class SearcherComponent implements OnInit {
  allFunctions:any = [{}];
  filteredFunctions:any = [{}];
  searchFilters = [];
  searchEnabled:boolean=false;
  constructor(
    private _functionService: FunctionService,
    private sanitizer:DomSanitizer
  ) { }

  ngOnInit(): void {
    this.get();  
  }
  onFilterChange(event){
    this.searchEnabled = true; // Activate search bar
    let toggle = event.source; // Get the toggle 
    if(event.value.includes('quit')){ // If the user clicked quit(x)
      this.filteredFunctions = this.allFunctions; // Show all the functions 
      toggle.buttonToggleGroup.value = []; // Clean the values of the toggle group
      this.searchFilters = []; // Clean the filters
      this.hideFilters();
      this.searchEnabled = false; // Deactivate search bar
    }else{
      if(event.value.length == 0){ // When no filter selected
        this.filteredFunctions = this.allFunctions; // Show all the functions
        this.searchEnabled = false; // Deactivate search bar
      }
      this.searchFilters = event.value; // Get the filters
    }
  }
  showFilters(){
    let filtersContainer = document.getElementById('filters');
    filtersContainer.style.transform = 'translateX(470px)'
  }
  hideFilters(){
    let filtersContainer = document.getElementById('filters');
    filtersContainer.style.transform = 'translateX(-170px)'
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
        this.allFunctions = data;
        this.allFunctions.forEach(func => {
          this.getColoredCode(func);
          func.user = func.createdBy.email;
        });
        this.filteredFunctions = this.allFunctions;
      }
    );
  }
  filterFunctions(event){
    let inputText = event.currentTarget.value;
    let new_functions = [];
    this.filteredFunctions  = this.allFunctions.filter(func => {
      let isInclude = false;
      this.searchFilters.forEach(filter =>{
        if(func[filter].includes(inputText) && !new_functions.includes(func)){
          isInclude = true;
        };
      })
      return isInclude;
    });
  }
}
