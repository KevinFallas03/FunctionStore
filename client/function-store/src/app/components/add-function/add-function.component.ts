import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FunctionService } from '../../services/functionService/function.service';

@Component({
  selector: 'app-add-function',
  templateUrl: './add-function.component.html',
  styleUrls: ['./add-function.component.css']
})
export class AddFunctionComponent implements OnInit {

  global_name_counter = 0;

  checkoutForm = this.formBuilder.group({
    createdBy: [''],
    name: [''],
    description: ['', Validators.required],
    category: ['', Validators.required],
    js_code: ['', Validators.required]
  });

  constructor(
    private functionService : FunctionService,
    private formBuilder : FormBuilder,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log("en submit");
    this.checkoutForm.value.createdBy = localStorage.getItem("user_id");
    if (this.checkoutForm.value.name === ""){
      this.setFunctionName();
    }
    if(this.validateFunction(this.checkoutForm.value.js_code)){
      this.functionService.post(this.checkoutForm.value).subscribe(
        (res) => {
          this.openSnackBar('Funtion added','Close');
        },
        (error) => {
          this.openSnackBar('Error on add function','Close');
        }
      );
    } else {
      this.openSnackBar('Error: Incorrect Function', 'Cerrar');
    }

  }

  setFunctionName(): void {
    this.checkoutForm.value.name = "function_" + this.global_name_counter;
    this.global_name_counter++;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  validateFunction(function_code): boolean {
    let is_function = false;
    try {
      let func = "("+function_code+")";
      is_function = eval(func);
    } catch (error) {
        this.openSnackBar('Error: Incorrect Function', 'Cerrar');
      }
    return is_function;
  }

}
