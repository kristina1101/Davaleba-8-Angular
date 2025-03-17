import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(public http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get<any>(
      'https://restaurant.stepprojects.ge/api/Products/GetAll'
    );
  }

  public loader: BehaviorSubject<boolean> = new BehaviorSubject(false);

  startLoading() {
    this.loader.next(true);
  }

  stopLoading() {
    this.loader.next(false);
  }
}
