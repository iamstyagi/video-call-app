import { Component, OnInit, Input } from '@angular/core';
import { Message } from 'src/app/demo/service/message';
import { User } from 'src/app/demo/service/user';
import { ChatService } from '../service/chat.service';
import { DataSharingService } from '../service/shared/data-sharing.service';

@Component({
    selector: 'app-user-card',
    templateUrl: './user-card.component.html'
})
export class UserCardComponent implements OnInit {

    @Input() user!: User;
    lastMessage!: Message;
    loginData:any;
    campid:any;
    userType:any;
    userDetails:any;
    agentid:any;
    chats:any;

    constructor(
        private chatService: ChatService,
        private dataSharingService: DataSharingService
        ) { }

    ngOnInit(): void {
        this.loginResData();
        let filtered = this.user.messages.filter(m => m.ownerId !== 123)
        this.lastMessage = filtered[filtered.length - 1];

        
    }

    changeView(user: any) {
        this.chatService.changeActiveChat(user);
    }

    loginResData() {
        this.loginData = JSON.parse((localStorage.getItem("loginData")));
        

        for (let i = 0; i < this.loginData['value'].length; i++) {
          this.campid = this.loginData['value'][i]['campid'];
          this.userType = this.loginData['value'][i]['userType'];
          this.agentid =  sessionStorage.getItem('agentid');

        }
        // this.getUserDetails();
      }


    getUserDetails() {
        this.userDetails = JSON.parse((localStorage.getItem("userDetails")));
        this.agentid = this.userDetails['agentid'];
        
        
    }


    selectUser(phoneNo){
        let data = {
            LoginUserID: this.agentid,
            userType: this.userType,
            campID: this.campid,
            // campID: '96',
            phoneno: phoneNo,
            // chatcount: "100"
        }
    
        this.chatService.getChatMessages(data).subscribe((res: any) => {
            if (res && res.listChats) {
                this.chats = JSON.parse(res.listChats);
                this.dataSharingService.sendMessage(JSON.parse(res.listChats));
            } else {
            }
        }, err => {
            
        });

    }
}
