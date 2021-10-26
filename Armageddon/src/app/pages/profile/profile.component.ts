// src/app/pages/profile/profile.component.ts

import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { user } from 'src/app/models/user';
import { ArmageddonApiService } from 'src/app/service/armageddon-api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileJson: string = '';

  constructor(private router: Router, private bsService: ArmageddonApiService, private auth: AuthService) { }
  
  user: user = {
    id: 0,
    username: 'username',
    email: 'password',
    winStreak: 0,
    shotStreak: 0,
    totalWins: 0,
    totalMatches: 0
  };

  ngOnInit(): void {
    this.bsService.getUserByName(window.location.href.slice(30)).then((value) => {
      this.user.id = value.id;
      this.user.username = value.username;
      this.user.email = value.email;
      this.user.winStreak = value.winStreak;
      this.user.shotStreak = value.shotStreak;
      this.user.totalWins = value.totalWins;
      this.user.totalMatches = value.totalMatches;
    });
  }

  goToHome() {
    this.router.navigateByUrl(`home/${this.user.username}`);
  }

}
