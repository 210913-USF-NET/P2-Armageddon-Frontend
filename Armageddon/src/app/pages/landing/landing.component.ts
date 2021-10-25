import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArmageddonApiService } from 'src/app/service/armageddon-api.service';
import { user } from '../../models/user';
import { AuthService } from '@auth0/auth0-angular';
import { getMissingNgModuleMetadataErrorData } from '@angular/compiler';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
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
  
  loggedInUser: user = {
    id: 0,
    username: '',
    email: '',
    winStreak: 0,
    shotStreak: 0,
    totalWins: 0,
    totalMatches: 0
  };

  constructor(private currRoute: ActivatedRoute, public bsService: ArmageddonApiService, private router: Router, public auth: AuthService) { }

  ngOnInit(): void {
    // this.bsService.getUserByName(this.auth.user$.su));
    this.auth.user$.subscribe(
      (profile) => (this.profileJson = JSON.stringify(profile, null, 2)),
    );

    // this.auth.user$.subscribe(
    //   (profile) => (this.loggedInUser.username = profile!.nickname!,
    //                 this.loggedInUser.email = profile!.email!)
    // );
    
    // this.auth.user$.subscribe(
    //   (profile) => (this.bsService.getUserByName(this.loggedInUser.username).then((value: user) => {
    //     // success
    //     if (value != null)
    //     {
    //       this.loggedInUser.id = value.id;
    //       this.loggedInUser.shotStreak = value.shotStreak;
    //       this.loggedInUser.totalMatches = value.totalMatches;
    //       this.loggedInUser.totalWins = value.totalWins;
    //       this.loggedInUser.winStreak = value.winStreak;
    //     }
    //     else {
    //       this.bsService.addUser(this.loggedInUser).then((res) => {
    //         alert('Welcome!');
    //       });
    //     }
    //   },)
    // ));
    //
    // console.log(this.loggedInUser)
    
    }

  // google onload attribute!
  // This section needs to be in the html. Also needs to be turned into an input-thing that autosends. 
  // <div *ngIf="auth.user$ | async as user">
  //   <button (click)="Data(profileJson)"></button>
  // </div>
  //
  // this collects said data in the TS
  // Data(D:any): void {
  //     console.log(D)
  // }
}
