import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _url: string = "https://localhost:5001/api/user";

  constructor(
    private http : HttpClient
  ) { }

  getUsers() {
    return this.http.get<Array<User>>(this._url);
  }

  createUser(user : User) {
    return this.http.post<User>(this._url, user);
  }

  updateUser(user : User) {
    return this.http.put<User>(`${this._url}/${user.id}`, user);
  }

  deleteUser(user: User) {
    return this.http.delete<User>(`${this._url}/${user.id}`);
  }
}
