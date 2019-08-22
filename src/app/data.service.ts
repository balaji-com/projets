import { Injectable } from '@angular/core';
import { Http,Response,Headers } from '@angular/http';
// import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';

// import 'rxjs/add/operator/map';
// import 'rxjs/Rx';
// import {  map } from 'rxjs/operators';

@Injectable()
export class DataService {

  constructor(private http:Http) { }
  getshoppingitems(){
    return this.http.get('http://localhost:3000/api/items')
    .pipe(map(res=>res.json()));
  }


  addshoppinglist(newitem){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/api/item',newitem,{headers:headers})
    .pipe(map(res =>res.json()));
  }


  deleteshoppinglist(id){
    return this.http.delete('http://localhost:3000/api/item/'+id)
    .pipe(map(res =>res.json()));
  }

  editshoppinglist(newitem){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.put('http://localhost:3000/api/item/'+newitem._id,newitem,{headers:headers})
    .pipe(map(res =>res.json()));
  }
}
