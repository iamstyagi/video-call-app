import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/demo/service/user';
import { ChatService } from './service/chat.service';
import { SharedService } from '../demo/service/shared.service';

@Component({
    templateUrl: './chat.app.component.html'
})
export class ChatAppComponent implements OnInit {

    subscription: Subscription;

    // activeUser!: User;
    activeUser: any;

    constructor(private chatService: ChatService, private sharedService: SharedService) {
        this.subscription = this.chatService.activeUser$.subscribe(data => this.activeUser = data);
    }

    // ngOnDestroy() {
    //     this.subscription.unsubscribe();
    // }

    ngOnInit(): void {        
    }
    
   
}
