import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { user } from '../models/user';
import { environment } from 'src/environments/environment';
import { friends } from '../models/friends';
import { chatHistory } from '../models/chatHistory';
import { layout } from '../models/layOut';
import { match } from '../models/match';
import { turn } from '../models/turn';

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

  // Users
  getUserById(id: number): Promise<user> {
    return this.http.get<user>(this.rootUrl + "/user/id/" + id).toPromise();
  }

  getUserByName(name: string): Promise<user> {
    return this.http.get<user>(this.rootUrl + "/user/username/" + name).toPromise();
  }

  addUser(user: user): Promise<user> {
    return this.http.post<user>(this.rootUrl + "/user/", user).toPromise();
  }

  updateUser(user: user): Promise<user> {
    return this.http.put<user>(this.rootUrl + "/user/" + user, user).toPromise();
  }


  // friends
  getFriendListById(id: number):Promise<friends[]> {
    return this.http.get<[]>(this.rootUrl + "/friends/"+id).toPromise();
  }
  addFriend(friend: friends): Promise<friends> {
    return this.http.post<friends>(this.rootUrl + "/friends/", friend).toPromise();
  }
  deleteFriend(id:number): Promise<void> {
    return this.http.delete<void>(this.rootUrl + "/friends/"+id).toPromise();
  }

  // chat history
  addChatHistory(chat:chatHistory):Promise<chatHistory> {
    return this.http.post<chatHistory>(this.rootUrl + "/chatHistory/", chat).toPromise();
  }

  // layout
  addLayout(layout:layout):Promise<layout> {
    return this.http.post<layout>(this.rootUrl + "/layout/", layout).toPromise();
  }
  getLayoutById(id: number):Promise<layout[]> {
    return this.http.get<[]>(this.rootUrl + "/layout/"+id).toPromise();
  }
  
  // matches
  addMatch(match:match):Promise<match> {
    return this.http.post<match>(this.rootUrl + "/match/", match).toPromise();
  }
  getLatestMatch(): Promise<match> {
    return this.http.get<match>(this.rootUrl + "/match/latest").toPromise();
  }
  
  // turns
  addTurn(turn:turn):Promise<turn> {
    return this.http.post<turn>(this.rootUrl + "/turn/", turn).toPromise();
  }
  getTurnById(id: number):Promise<turn[]> {
    return this.http.get<[]>(this.rootUrl + "/turn/"+id).toPromise();
  }
}
