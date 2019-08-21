import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public endpoint = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  get(id: string, callback) {
    this.http.get(`${this.endpoint}/coffees/${id}`)
      .subscribe(res => {
        callback(res);
      });
  }
  getList(callback) {
    // const list = [
    //   new Coffee('Double Espresso', 'Sunny Cafe', new PlaceLocation('123 Market St', 'San Francisco')),
    //   new Coffee('Caramel Americano', 'Starcoffeee', new PlaceLocation('Gran Via 34', 'Madrid')),
    // ];
    // callback(list);
    this.http.get(`${this.endpoint}/coffees`).subscribe( res => {
      console.log(res);
      callback(res);
    });
  }

  save(coffee, callback) {

    if (coffee._id) {
      this.http.put(`${this.endpoint}/coffees/${coffee._id}`, coffee)
        .subscribe(res => {
          callback(true);
        });
    } else {
      this.http.post(`${this.endpoint}/coffees`, coffee)
        .subscribe(res => {
          callback(true);
        });
    }
  }
}
