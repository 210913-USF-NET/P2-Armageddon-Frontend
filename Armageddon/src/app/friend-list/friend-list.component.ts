import { Component, OnInit } from '@angular/core';
import { ArmageddonApiService } from 'src/app/service/armageddon-api.service';
import { user } from '../models/user';
import { friends } from '../models/friends';
import { AuthService } from '@auth0/auth0-angular';
import { NgForm, NgModel } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileComponent } from '../pages/profile/profile.component';
import { async } from 'rxjs';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.css']
})
export class FriendListComponent implements OnInit {

  constructor(private armageddonService: ArmageddonApiService, public auth: AuthService, private currentRoute: ActivatedRoute, private router: Router, public p: ProfileComponent) { }
  user: user = {
    id: 1,
    username: '',
    email: '',
    winStreak: 0,
    shotStreak: 0,
    totalWins: 0,
    totalMatches: 0
  };
  friend: friends = {
    id: 0,
    user1Id: 1,
    user2Id: 2,
  };
  userfriend: user = {
    id: 0,
    username: '',
    email: '',
    winStreak: 0,
    shotStreak: 0,
    totalWins: 0,
    totalMatches: 0
  };
  currentFriend: user = {
    id: 0,
    username: '',
    email: '',
    winStreak: 0,
    shotStreak: 0,
    totalWins: 0,
    totalMatches: 0
  };
  friendname: string = "";
  friendusers: user[] = [];
  friends: friends[] = [];
  profileJson: string = '';
  popup: boolean = false;
  popupd: boolean = false;
  popupf: boolean = false;
  friendsId: number[] = [];
  value: number = 0;
  selectedIndex: number = -1;
  currentUserId = 0;
  
  ngOnInit(): void {
    //get friend list by id, u need to get current user id and parse it to parameter
    //Im unable to get current user info, i just use user 1 as test, you can update it later
    console.log(window.location.href.slice(30));
    this.armageddonService.getUserByName(window.location.href.slice(30)).then(async result => {
      this.user.id = result.id;
      this.armageddonService.getFriendListById(this.user.id).then(async result => {
        this.friends = result;
        if (this.friends.length != 0) {
          for (var i = 0; i < this.friends.length; i++) {
            if (this.friends[i].user1Id == this.user.id) {
              this.friendsId.push(this.friends[i].user2Id);
              this.armageddonService.getUserById(this.friends[i].user2Id).then(result => { this.userfriend = result; this.friendusers.push(this.userfriend); });

            } else {
              this.friendsId.push(this.friends[i].user1Id);
              this.armageddonService.getUserById(this.friends[i].user1Id).then(result => { this.userfriend = result; this.friendusers.push(this.userfriend); });
            }

          }
        }
      });
    }

    );
    
    
  }
  select(index: number) {
    this.selectedIndex = index;
    if (index >= 0) {

    
    this.armageddonService.getUserByName(this.friendusers[index].username).then(async result => {
      this.currentFriend = result;
    });
    }
  }

  addFriend(friendname: string) {

    this.armageddonService.getUserByName(friendname).then((res) => {
      if (!res) {
        alert('Dear user, I believe there is not such username in our database.');
      } else {
        this.userfriend = res;
        //I hard code 1 as the first user id, it should be current user id
        this.friend.user1Id = this.user.id;
        
        this.friend.user2Id = res.id;
        if (!this.friendsId.includes(this.friend.user2Id)) {
          this.armageddonService.addFriend(this.friend).then((res) => {
            alert('friend added successfully!');
            window.location.reload();
          });
        } else {
          alert("Dear user, I believe you two are friends already");
        }
      }
    }, (err) => alert('Dear user, I believe there is not such username in our database.'));
    
  }

  noFriend() {
    alert('bro, you have no friend');
  }
  deleteFriend(friendname: string) {
    
    let response = confirm(`do you really want to delete ${friendname}?`).valueOf()

    if (response) {

      var friendindex = -1;
      this.friendusers.forEach(function (item, index) {
        if (item.username == friendname) {
          friendindex = index;
        }
      });

      this.armageddonService.deleteFriend(this.friends[friendindex].id).then((res) => {
        alert(`friendship end with ${friendname}`);
        window.location.reload();
      }, (res) => alert('something went wrong'));
    }
  }

}
