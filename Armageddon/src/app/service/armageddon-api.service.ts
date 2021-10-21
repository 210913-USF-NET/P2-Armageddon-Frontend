import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { user } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ArmageddonApiService {

  rootUrl: string = "https://armageddonapi.azurewebsites.net/api/user";
  constructor(private http: HttpClient) { }

  getAllUsers(): Promise<user[]>{

    //by default, httpClient returns observables
    //they are similar to promises, but instead of promise resolving once it receives the data
    //observables keeps the line open
    return this.http.get<[]>(this.rootUrl).toPromise();

  }
}
