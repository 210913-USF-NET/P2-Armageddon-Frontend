import { Component, OnInit } from '@angular/core';
import { user } from '../models/user';
import { ArmageddonApiService } from '../service/armageddon-api.service';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: user[] = [];

  constructor(private armageddonService: ArmageddonApiService) { }

  ngOnInit(): void {

    this.armageddonService.getAllUsers().then(result => {

      this.users = result; 
    })
  }

}
