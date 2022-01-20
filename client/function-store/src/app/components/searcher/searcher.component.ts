import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FunctionService } from '../../services/functionService/function.service';

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.css']
})
export class SearcherComponent implements OnInit {
  all_functions:any = [{}];
  temp_colored_code = "";
  constructor(
    private _functionService: FunctionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log("Inicio del searcher");
    this.get();
  }
  getColoredCode(func){
    this._functionService.getColoredCode(func.js_code).subscribe(
      data => {
        this.temp_colored_code =  data;
        console.log(data);
        // const div = document.getElementById("1");
        // div.innerHTML = this.temp_colored_code;
      }
    );
    // return this.temp_colored_code;
  }
  showMsg(text){
    console.log(text);
  }
  get(){
    this._functionService.getAll().subscribe(
      data => {
        console.log(data);
        this.all_functions = data;
      }
    );
    console.log(this.all_functions);
  }
}
