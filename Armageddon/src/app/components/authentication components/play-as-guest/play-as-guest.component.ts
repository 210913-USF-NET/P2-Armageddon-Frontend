import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArmageddonApiService } from 'src/app/service/armageddon-api.service';
import { user } from '../../../models/user';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-play-as-guest',
  templateUrl: './play-as-guest.component.html',
  styles: [
  ]
})
export class PlayAsGuestComponent implements OnInit {
  profileJson: string = '';

  id = 0;
  user: user = {
    id: 0,
    username: 'random',
    email: 'password',
    winStreak: 0,
    shotStreak: 0,
    totalWins: 0,
    totalMatches: 0
  };

  constructor(private currRoute: ActivatedRoute, private bsService: ArmageddonApiService, private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.user$.subscribe(
      (profile) => (this.profileJson = JSON.stringify(profile, null, 2)),
    );
  }
  goToHome(): void {
    //navigate by absolute path
    var randomName = Math.random().toString(36).substr(2);
    this.user.username = randomName;
    var randomPassword = Math.random().toString(36).substr(2);
    this.user.email = randomPassword;
    //bug
    /*this.bsService.addUser(this.user).then((res) => {
      alert('Welcome Guess:' + randomName+ '!')
      this.router.navigateByUrl(`home/${this.user.username}`);
    });*/
    this.router.navigateByUrl(`home`);
  }
}
