import { Injectable, OnInit } from '@angular/core';
import * as signalR from '@microsoft/signalr';          // import signalR
import { HttpClient } from '@angular/common/http';
import { MessageDto } from '../models/MessageDto';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  /*connection = new signalR.HubConnectionBuilder()
    .configureLogging(signalR.LogLevel.Debug)
    .withUrl("http://localhost:4200/chatsocket", {
      skipNegotiation: true,
      transport: signalR.HttpTransportType.WebSockets
    })
    .build();*/
 /* private connection: any = new signalR.HubConnectionBuilder().withUrl("https://armageddonapi.azurewebsites.net/chatsocket")   // mapping to the chathub as in startup.cs
    .configureLogging(signalR.LogLevel.Information)
    .build();*/
  private connection: any = new signalR.HubConnectionBuilder().withUrl("https://localhost:5001/chatsocket")   // mapping to the chathub as in startup.cs
    .configureLogging(signalR.LogLevel.Information)
    .build();
  /*private connection: any = new signalR.HubConnectionBuilder().withUrl(environment.bsAPIUrl+"/chatsocket/")   // mapping to the chathub as in startup.cs
    .configureLogging(signalR.LogLevel.Information)
    .build();*/
  /*readonly POST_URL = environment.bsAPIUrl+"/chat/send/";*/
  /*readonly POST_URL = "https://armageddonapi.azurewebsites.net/api/chat/send/"*/
  readonly POST_URL = "https://localhost:5001/api/chat/send/";
  private receivedMessageObject: MessageDto = new MessageDto();
  private sharedObj = new Subject<MessageDto>();

  constructor(private http: HttpClient) {
    this.connection.onclose(async () => {
      await this.start();
    });
    this.connection.on("ReceiveOne", (user:string, message:string) => { this.mapReceivedMessage(user, message); });
    this.start();
  }


  // Strart the connection
  public async start() {
    try {
      await this.connection.start();
      console.log("connected");
    } catch (err) {
      console.log(err);
      setTimeout(() => this.start(), 5000);
    }
  }

  private mapReceivedMessage(user: string, message: string): void {
    this.receivedMessageObject.user = user;
    this.receivedMessageObject.msgText = message;
    this.sharedObj.next(this.receivedMessageObject);
  }

  /* ****************************** Public Mehods **************************************** */

  // Calls the controller method
  public broadcastMessage(msgDto: any) {
    this.http.post(this.POST_URL, msgDto).subscribe(data => console.log(data));
    //this.connection.invoke("SendMessage1", msgDto.user, msgDto.msgText).catch(err => console.error(err));    // This can invoke the server method named as "SendMethod1" directly.
  }

  public retrieveMappedObject(): Observable<MessageDto> {
    return this.sharedObj.asObservable();
  }


}
