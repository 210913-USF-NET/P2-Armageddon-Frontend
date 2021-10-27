import { Component, OnInit, Inject  } from '@angular/core';
import { ChatService } from 'src/app/service/chat.service';
import { MessageDto } from 'src/app/models/MessageDto';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  constructor(private chatService: ChatService, public auth: AuthService, @Inject(DOCUMENT) public document: Document) { }

  ngOnInit(): void {
    this.chatService.retrieveMappedObject().subscribe((receivedObj: MessageDto) => { this.addToInbox(receivedObj); });  // calls the service method to get the new messages sent

  }

  msgDto: MessageDto = new MessageDto();
  msgInboxArray: MessageDto[] = [];

  send(): void {
    if (this.msgDto) {
      if (this.msgDto.msgText.length == 0) {
        window.alert("field is required.");
        return;
      } else {
        this.msgDto.user = Math.random().toString(36).substr(2);
        this.chatService.broadcastMessage(this.msgDto);                  
      }
    }
  }

  addToInbox(obj: MessageDto) {
    let newObj = new MessageDto();
    // get username;
    newObj.user = obj.user;
    newObj.msgText = obj.msgText;
    this.msgInboxArray.push(newObj);

  }
}
