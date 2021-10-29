import { TestBed } from '@angular/core/testing';
import { ArmageddonApiService } from './armageddon-api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { user } from '../models/user';
import { friends } from "../models/friends";
import { chatHistory } from "../models/chatHistory";

describe('ArmageddonApiService', () => {
  let service: ArmageddonApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ArmageddonApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getAllUsers should get an array of users', async () => {

    let fakeData: user[] = [
      {
        "id": 1,
        "username": "linguz2",
        "email": "linguz2@gmail.com",
        "winStreak": 0,
        "shotStreak": 0,
        "totalWins": 0,
        "totalMatches": 0
      },
      {
        "id": 2,
        "username": "1",
        "email": "1@gmail.com",
        "winStreak": 0,
        "shotStreak": 0,
        "totalWins": 0,
        "totalMatches": 0
      }
    ];

    spyOn(service, 'getAllUsers').and.returnValue(Promise.resolve(fakeData));

    await service.getAllUsers().then((u) => {
      expect(service.getAllUsers).toHaveBeenCalled();
      expect(u.length).toEqual(2);
    });
  });

  it('addUser should create a user', async () => {
    let fakeUser = {
      "id": 1,
      "username": "linguz2",
      "email": "linguz2@gmail.com",
      "winStreak": 0,
      "shotStreak": 0,
      "totalWins": 0,
      "totalMatches": 0
    }

    spyOn(service, 'addUser').and.returnValue(Promise.resolve(fakeUser));

    await service.addUser(fakeUser).then((user) => {
      //assert here, that we're getting what we're expecting
      expect(service.addUser).toHaveBeenCalled();
      expect(user).toEqual(fakeUser);
    });
  });

  it('getUserById should return a user for that id', async () => {

    let fakeUser = {
      "id": 1,
      "username": "linguz2",
      "email": "linguz2@gmail.com",
      "winStreak": 0,
      "shotStreak": 0,
      "totalWins": 0,
      "totalMatches": 0
    }

    spyOn(service, 'getUserById').and.returnValue(Promise.resolve(fakeUser));

    await service.getUserById(fakeUser.id).then((user) => {
      expect(service.getUserById).toHaveBeenCalled();
      expect(user).toEqual(fakeUser);
    });
  });

  it('getUserByName should return a user by that name', async () => {
    let fakeUser = {
      "id": 1,
      "username": "linguz2",
      "email": "linguz2@gmail.com",
      "winStreak": 0,
      "shotStreak": 0,
      "totalWins": 0,
      "totalMatches": 0
    }

    spyOn(service, 'getUserByName').and.returnValue(Promise.resolve(fakeUser));

    await service.getUserByName(fakeUser.username).then((user) => {
      expect(service.getUserByName).toHaveBeenCalled();
      expect(user).toEqual(fakeUser);
    });
  });

  it('getFriendListById should return friends for that user', async () => {
    let fakeData: user[] = [
      {
        "id": 1,
        "username": "linguz2",
        "email": "linguz2@gmail.com",
        "winStreak": 0,
        "shotStreak": 0,
        "totalWins": 0,
        "totalMatches": 0
      },
      {
        "id": 2,
        "username": "1",
        "email": "1@gmail.com",
        "winStreak": 0,
        "shotStreak": 0,
        "totalWins": 0,
        "totalMatches": 0
      }
    ];
    let friend: friends[] = [
      {
        "id": 1,
        "user1Id": 1,
        "user2Id": 2
      }
    ];

    spyOn(service, 'getFriendListById').and.returnValue(Promise.resolve(friend));

    await service.getFriendListById(fakeData[0].id).then((user) => {
      expect(service.getFriendListById).toHaveBeenCalled();
      expect(user.length).toEqual(1);
    })
  })

  it('addFriend should add a friend', async () => {

    let friend =
    {
      "id": 1,
      "user1Id": 1,
      "user2Id": 2
    }

    spyOn(service, 'addFriend').and.returnValue(Promise.resolve(friend));
    await service.addFriend(friend).then((fr) => {

      expect(service.addFriend).toHaveBeenCalled();
      expect(fr).toEqual(friend);
    });
  });

  // it('deleteFriend should remove a friend', async () =>{
  //   let friend =
  //   {
  //     "id": 1,
  //     "user1Id": 1,
  //     "user2Id": 2
  //   }

  //   spyOn(service, 'deleteFriend');
  //   await service.deleteFriend(friend.user1Id);
  //   expect(service.deleteFriend).toHaveBeenCalled();
  //   expect
  // });

  it('addChatHistory should add a chathistory', async () =>{
      let chatHistory = {
        'id': 1,
        'userId': 2,
        'message': 'Hey this is the first message',
        'time': new Date()
      }

      spyOn(service, 'addChatHistory').and.returnValue(Promise.resolve(chatHistory));
      await service.addChatHistory(chatHistory).then((ch) => {
        expect(service.addChatHistory).toHaveBeenCalled();
        expect(ch).toEqual(chatHistory);
      })
  });

  it('addLayOut should add layout', async () => {
      let layOut = {
        'id': 1,
        'playerId': 1,
        'matchId': 2,
        'shipType': 'cruiser',
        'startLocation': 2,
        'direction': 'down'
      }

      spyOn(service, 'addLayout').and.returnValue(Promise.resolve(layOut));

      await service.addLayout(layOut).then((lo) => {
        expect(service.addLayout).toHaveBeenCalled();
        expect(lo).toEqual(layOut);
      });
  });

  it('addMatch should add a match', async () => {
    let match = {
      'id': 1,
      'hostId': 1,
      'turnCount': 1,
      'winnerId': 1,
      'opponentId': 2
    }

    spyOn(service, 'addMatch').and.returnValue(Promise.resolve(match));

    await service.addMatch(match).then((m) => {
      expect(service.addMatch).toHaveBeenCalled();
      expect(m).toEqual(match);
    })
  })
  it('addTurn should add a turn', async () => {
    let turn = {
      id: 1,
      playerId: 1,
      targetId: 2,
      matchId: 1,
      shotLocation: 23,
      turnNumber: 2
    }

    spyOn(service, 'addTurn').and.returnValue(Promise.resolve(turn));

    await service.addTurn(turn).then((t) => {
      expect(service.addTurn).toHaveBeenCalled();
      expect(t).toEqual(t);
    })
  });

  // it('getTurnById should return the turn', async () => {
  //   let turn = {
  //     'id': 1,
  //     'playerId': 1,
  //     'targetId': 2,
  //     'matchId': 1,
  //     'shotLocation': 23,
  //     'turnNumber': 2
  //   }

  //   spyOn(service, 'getTurnById').and.returnValue(Promise.resolve(turn));
  // })
});
