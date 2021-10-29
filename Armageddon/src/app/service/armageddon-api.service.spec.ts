import { TestBed } from '@angular/core/testing';
import { ArmageddonApiService } from './armageddon-api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { user } from '../models/user';

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
});
