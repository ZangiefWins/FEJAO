import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _url: string = "https://localhost:5001/api/user";

  constructor(
    private http : HttpClient
  ) { }

  getUsers() {
    return this.http.get(this._url);
  }
}
