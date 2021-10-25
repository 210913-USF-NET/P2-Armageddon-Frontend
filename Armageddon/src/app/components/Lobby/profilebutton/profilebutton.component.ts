import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { user } from 'src/app/models/user';
import { ArmageddonApiService } from 'src/app/service/armageddon-api.service';

@Component({
  selector: 'app-profilebutton',
  templateUrl: './profilebutton.component.html',
  styleUrls: ['./profilebutton.component.css']
})
export class ProfilebuttonComponent implements OnInit {

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
    this.bsService.getUserByName(window.location.href.slice(27)).then((value) => {
      this.user.id = value.id;
      this.user.username = value.username;
      this.user.email = value.email;
      this.user.winStreak = value.winStreak;
      this.user.shotStreak = value.shotStreak;
      this.user.totalWins = value.totalWins;
      this.user.totalMatches = value.totalMatches;
    });
  }

  profilepage(): void {
    this.router.navigateByUrl(`profile/${this.user.username}`)
  }
}
