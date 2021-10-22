import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { user } from '../models/user';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ArmageddonApiService {

  rootUrl: string = environment.bsAPIUrl;
  constructor(private http: HttpClient) { }

  getAllUsers(): Promise<user[]>{

    //by default, httpClient returns observables
    //they are similar to promises, but instead of promise resolving once it receives the data
    //observables keeps the line open
    return this.http.get<[]>(this.rootUrl).toPromise();

  }

  getUserById(id: number): Promise<user> {
    return this.http.get<user>(this.rootUrl + "/user/" + id).toPromise();
  }

  getUserByName(name: string): Promise<user> {
    return this.http.get<user>(this.rootUrl + "/user/" + name).toPromise();
  }

  addUser(user: user): Promise<user> {
    return this.http.post<user>(this.rootUrl+"/user/", user).toPromise();
  }


}
