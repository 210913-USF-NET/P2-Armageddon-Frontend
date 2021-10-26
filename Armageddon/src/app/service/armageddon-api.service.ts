import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { user } from '../models/user';
import { environment } from 'src/environments/environment';
import { friends } from '../models/friends';

@Injectable({
  providedIn: 'root'
})

export class ArmageddonApiService {

  rootUrl: string = environment.bsAPIUrl;
  constructor(private http: HttpClient) { }

  getAllUsers(): Promise<user[]> {

    //by default, httpClient returns observables
    //they are similar to promises, but instead of promise resolving once it receives the data
    //observables keeps the line open
    return this.http.get<[]>(this.rootUrl + "/user/").toPromise();

  }

  getUserById(id: number): Promise<user> {
    return this.http.get<user>(this.rootUrl + "/user/id/" + id).toPromise();
  }

  getUserByName(name: string): Promise<user> {
    return this.http.get<user>(this.rootUrl + "/user/username/" + name).toPromise();
  }

  addUser(user: user): Promise<user> {
    return this.http.post<user>(this.rootUrl + "/user/", user).toPromise();
  }

  getFriendListById(id: number):Promise<friends[]> {
    return this.http.get<[]>(this.rootUrl + "/friends/"+id).toPromise();
  }
  addFriend(friend: friends): Promise<friends> {
    return this.http.post<friends>(this.rootUrl + "/friends/", friend).toPromise();
  }
  deleteFriend(id:number): Promise<void> {
    return this.http.delete<void>(this.rootUrl + "/friends/"+id).toPromise();
  }
}
