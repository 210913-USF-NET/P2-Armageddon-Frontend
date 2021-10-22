import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ArmageddonApiService } from 'src/app/service/armageddon-api.service';
import { user } from '../models/user';
import { AuthService } from '@auth0/auth0-angular';
import { User } from '@auth0/auth0-spa-js';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 
  constructor(private currentRoute: ActivatedRoute, private bsApi: ArmageddonApiService) { }
  rootUrl: string = 'http://localhost:4200';
  name = "guess";
  user: user = {
    id: 0,
    name: 'name',
    password: 'password',
    winStreak: 0,
    shotStreak: 0,
    totalWins: 0,
    totalMatches: 0
  };
  ngOnInit(): void {
    this.currentRoute.params.subscribe(params => {
      
      this.name = params['name'];
      console.log(this.name);
      // it should get the user id 1. it does get the value but didnt pass to the html
      this.bsApi.getUserById(1).then(resto => {
        this.user.name = resto.name;
      });
      console.log(this.user.name);
    });
  }
}
