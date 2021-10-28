import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ArmageddonApiService } from 'src/app/service/armageddon-api.service';
import { user } from '../../models/user';
import { AuthService } from '@auth0/auth0-angular';


@Component({
  selector: 'app-home',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {

  constructor(private currentRoute: ActivatedRoute, private bsService: ArmageddonApiService, private auth: AuthService) { }
  rootUrl: string = 'http://localhost:4200';

  user: user = {
    id: 0,
    username: 'username',
    email: 'password',
    winStreak: 0,
    shotStreak: 0,
    totalWins: 0,
    totalMatches: 0
  };

  declare profileJson: string
  declare username: string

  ngOnInit(): void {
    // window.location.href.slice(27)
    // ^ this gets everything after home/, which on the lobby is JUST the username. Or should be. 

    this.auth.user$.subscribe(
      (profile) => {
        this.profileJson = JSON.stringify(profile, null, 2);
        let obj = JSON.parse(this.profileJson);
        this.username = obj.nickname;

        this.bsService.getUserByName(this.username).then((value) => {
          this.user.id = value.id;
          this.user.username = value.username;
          this.user.email = value.email;
          this.user.winStreak = value.winStreak;
          this.user.shotStreak = value.shotStreak;
          this.user.totalWins = value.totalWins;
          this.user.totalMatches = value.totalMatches;
        });
      });

    // console.log(window.location.href.slice(27));
    // this.bsService.getUserByName(window.location.href.slice(27)).then((value) => {
    //   this.user.id = value.id;
    //   this.user.username = value.username;
    //   this.user.email = value.email;
    //   this.user.winStreak = value.winStreak;
    //   this.user.shotStreak = value.shotStreak;
    //   this.user.totalWins = value.totalWins;
    //   this.user.totalMatches = value.totalMatches;
    // });
  }
}
