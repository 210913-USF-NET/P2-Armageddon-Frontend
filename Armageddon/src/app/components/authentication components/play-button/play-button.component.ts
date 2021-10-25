import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArmageddonApiService } from 'src/app/service/armageddon-api.service';
import { user } from '../../../models/user';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-play-button',
  templateUrl: './play-button.component.html',
  styles: [
  ]
})
export class PlayButtonComponent implements OnInit {

  constructor(private router: Router, private bsService: ArmageddonApiService, private auth: AuthService) { }
  
  profileJson: string = '';

  loggedInUser: user = {
    id: 0,
    username: '',
    email: '',
    winStreak: 0,
    shotStreak: 0,
    totalWins: 0,
    totalMatches: 0
  };

  ngOnInit(): void {
    // set user to the stuffs
    
  }

  goToHome(): void {
    //navigate by absolute path

    this.auth.user$.subscribe(
      (profile) => (this.loggedInUser.username = profile!.nickname!,
                    this.loggedInUser.email = profile!.email!)
    );

    this.auth.user$.subscribe(
      (profile) => (this.bsService.getUserByName(this.loggedInUser.username).then((value: user) => {
        // success
        if (value != null)
        {
          this.loggedInUser.id = value.id;
          this.loggedInUser.shotStreak = value.shotStreak;
          this.loggedInUser.totalMatches = value.totalMatches;
          this.loggedInUser.totalWins = value.totalWins;
          this.loggedInUser.winStreak = value.winStreak;

          console.log(this.loggedInUser);

          this.router.navigateByUrl(`home/${this.loggedInUser.username}`);
        }
        else {
          this.bsService.addUser(this.loggedInUser).then((res) => {
            alert('Welcome! Your account has been created, have fun!');
          });
        }
      },)
    ));
  }
}
