import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArmageddonApiService } from 'src/app/service/armageddon-api.service';
import { user } from '../../../models/user';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-go-home',
  templateUrl: './go-home-button.component.html'
})
export class GoHomeComponent implements OnInit {
  profileJson: string = '';

  id = 0;
  user: user = {
    id: 0,
    username: 'random',
    password: 'password',
    winStreak: 0,
    shotStreak: 0,
    totalWins: 0,
    totalMatches: 0
  };

  constructor(private currRoute: ActivatedRoute, private bsService: ArmageddonApiService, private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
    /*this.auth.user$.subscribe(
      (profile) => (this.profileJson = JSON.stringify(profile, null, 2)),
    );*/
  }
  goToHome(): void {
    this.router.navigateByUrl(`home`);
  }
}
