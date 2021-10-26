import { Component, OnInit } from '@angular/core';
import { ArmageddonApiService } from 'src/app/service/armageddon-api.service';
import { user } from '../../../models/user';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styles: []
})

export class LeaderboardComponent implements OnInit {

  constructor(private armageddonService: ArmageddonApiService) { }

  AMOUNT: number = 5;
  users: user[] = [];

  ngOnInit(): void {
    this.armageddonService.getAllUsers().then(result => {
      result.sort((a, b) => (a.totalWins < b.totalWins) ? 1 : -1);
      result.splice(this.AMOUNT);
    })
  }

}
