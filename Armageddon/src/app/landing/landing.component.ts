import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArmageddonApiService } from 'src/app/service/armageddon-api.service';
import { user } from '../models/user';
import { AuthService } from '@auth0/auth0-angular';
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  id = 0;
  user: user = {
    id: 5,
    name: 'random',
    password: 'password',
    winStreak: 0,
    shotStreak: 0,
    totalWins: 0,
    totalMatches: 0
  };

  constructor(private currRoute: ActivatedRoute, private bsService: ArmageddonApiService, private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
  }

  goToHome(): void {
    //navigate by absolute path
    this.router.navigateByUrl(`home/${this.user.name}`);
  }

}
