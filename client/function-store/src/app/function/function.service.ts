import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class FunctionService {
  _apiUrl = environment.url + "/api/functions";

  constructor(private _http: HttpClient) { }

  post(new_function){
    const headers = {"Content-Type":"application/json"};
    return this._http.post<any>(this._apiUrl , new_function, {headers});
  }
  getAll(){
    return this._http.get<any>(this._apiUrl);
  }
  getById(id){
    return this._http.get<any>(this._apiUrl+'/'+id);
  }
  getManyById(data){
    return this._http.get<any>(this._apiUrl+'/many/'+data);
  }

  findByIdAndUpdate(id, new_function){
    return this._http.put(this._apiUrl+'/'+id, new_function);
  }

  deleteById(id){
    return this._http.delete(this._apiUrl+'/'+id);
  }
}
