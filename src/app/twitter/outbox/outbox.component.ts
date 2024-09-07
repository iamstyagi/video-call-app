import { Component, OnInit } from '@angular/core';
import { TwitterService } from '../services/twitter.service';

@Component({
  selector: 'app-outbox',
  templateUrl: './outbox.component.html',
  styleUrls: ['./outbox.component.scss']
})
export class OutboxComponent  implements OnInit {
  outboxTweets:any[] = [];
  agentid: any;
  campid: any;
  userType: any;
  loginData: any;
  userDetails: any;
  inboxTweets:any[] = [];
  id:any;

  constructor(private twitterService: TwitterService) { }

  ngOnInit(): void {
    this.loginResData();
    this.getTweets();

    this.id = setInterval(() => {
      this.getTweets();
    }, 60000)
  }


  loginResData() {
    this.loginData = JSON.parse((localStorage.getItem("loginData")));
    

    this.campid = this.loginData.value[0].campid;
    this.userType = this.loginData.value[0].userType;
    this.agentid = sessionStorage.getItem('agentid');
  }



  getTweets() {
    let data = {
      loginUserID: this.agentid,
      campID: this.campid,
      userType: this.userType,
      selectedFolder: 'twitter-outbox'
    }
    

    this.twitterService.tweetInbox(data).subscribe((res: any) => {
      
      this.outboxTweets = res.value;
    }, err => {
      
    })
  }

  ngOnDestroy() {
    if (this.id) {
      clearInterval(this.id);
    }
  }
}
