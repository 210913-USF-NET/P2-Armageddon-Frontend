import { Injectable } from '@angular/core';
import { CometChat } from '@cometchat-pro/chat';
import { environment } from 'src/environments/environment';
import { user } from 'src/app/models/user';
@Injectable({
  providedIn: 'root'
})
export class CometChatService {
  currentUser: user = {
    id: 0,
    username: 'username',
    email: 'password',
    winStreak: 0,
    shotStreak: 0,
    totalWins: 0,
    totalMatches: 0
  };


  init(apiKey: string = environment.appId) {
    CometChat.init(apiKey).then(
      msg => console.log('Initialized succesfull: ', msg),
      err => {
        console.log('Initialization failed: ', err);
        throw err;
      }
    );
  }

  login(userId: string, apiKey: string = environment.apiKey) {
    return CometChat.login(userId, apiKey)
      .then(usr => (this.currentUser = usr))
      .then(_ => console.log('User logged in'), console.error);
  }

  sendMessage(receiverId: string, text: string) {
    const message = new CometChat.TextMessage(
      receiverId,
      text,
      CometChat.MESSAGE_TYPE.TEXT
    );

    return CometChat.sendMessage(message);
  }

  listenForMessages(listenerId: string, onMessageReceived: (msg: any) => void) {
    CometChat.addMessageListener(
      listenerId,
      new CometChat.MessageListener({
        onTextMessageReceived: onMessageReceived,
        onMediaMessageReceived: undefined
      })
    );
  }

  removeListener(listenerId: string) {
    CometChat.removeMessageListener(listenerId);
  }

  joinGroup(groupId: string) {
    return CometChat.joinGroup(groupId, CometChat.GROUP_TYPE.PUBLIC, '');
  }

  getPreviousMessages(groupId: string) {
    const messageRequest = new CometChat.MessagesRequestBuilder()
      .setGUID(groupId)
      .setLimit(100)
      .build();

    return messageRequest.fetchPrevious();
  }
}
