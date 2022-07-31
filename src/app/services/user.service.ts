import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userIndex: number = 0
  apiURL = "https://sheet.best/api/sheets/be5e6210-9c86-414e-9aff-3b6591f6e5ac";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.apiURL)
  }

  getUser(id: string): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.apiURL}/id/${id}`)
  }

  createUser(user: User): Observable<User> {
    return this.httpClient.post<User>(this.apiURL, user, this.httpOptions);
  }

  deleteUser(id: number) {
    return this.httpClient.delete<User>(`${this.apiURL}/id/${id}`)
  }

  updateUser(id: string, user: User): Observable<User> {
    return this.httpClient.put<User>(`${this.apiURL}/id/${id}`, user, this.httpOptions);

  }

  getUserIndex(): number {
    return this.userIndex;
  }

  setUserIndex(index: number): void {
    this.userIndex = index;
  }
}
