import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArmageddonApiService } from 'src/app/service/armageddon-api.service';
import { user } from '../../models/user';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private currentRoute: ActivatedRoute, private bsService: ArmageddonApiService, private auth: AuthService, private router: Router) { }
  rootUrl: string = 'http://localhost:4200';

  username = "test";
  user: user = {
    id: 0,
    username: '',
    password: '',
    winStreak: 0,
    shotStreak: 0,
    totalWins: 0,
    totalMatches: 0
  };

  ngOnInit(): void {
    this.currentRoute.params.subscribe(params => {

      this.username = params['name'];
      console.log(this.username);
      // it should get the user id 1. it does get the value but didnt pass to the html
      
      this.bsService.getUserById(1).then(tempuser => {
        this.user = tempuser;
      });

      console.log(this.user.username);
    });
  
  }

  goToProfile(username:string) {
    this.router.navigateByUrl(`profile/${username}`);
  }

}
