import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArmageddonApiService } from 'src/app/service/armageddon-api.service';
import { user } from '../../models/user';
import { AuthService } from '@auth0/auth0-angular';
import { getMissingNgModuleMetadataErrorData } from '@angular/compiler';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  profileJson: string = '';
  x: HubConnection | undefined;
  _hubConnection: signalR.HubConnection | undefined;

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

    console.log("Trying hub connections...");

    let _hubConnection = new HubConnectionBuilder().withUrl('https://localhost:44340/api/message');
    
    this._hubConnection?.on('send', data => {
      console.log(data);
    })
    
    this._hubConnection?.start().then(() =>
      this._hubConnection?.invoke('send', 'Hello, New Connection'))
      .catch(err => console.log('Error while starting connection: ' + err))
      .finally(() => console.log("Tried to connect."));
    
    console.log("Finished hub connections...");
    }

  Test(): void {
    this._hubConnection?.invoke('send', "The button was pressed somewhere.");
  }
}
