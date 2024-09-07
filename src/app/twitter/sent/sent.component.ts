import { Component, OnInit } from '@angular/core';
import { TwitterService } from '../services/twitter.service';

@Component({
  selector: 'app-sent',
  templateUrl: './sent.component.html',
  styleUrls: ['./sent.component.scss']
})
export class SentComponent implements OnInit {
  sentTweets: any[] = [];
  agentid: any;
  campid: any;
  userType: any;
  loginData: any;
  userDetails: any;
  inboxTweets: any[] = [];
  id: any;

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
      selectedFolder: 'twitter-sent'
    }


    this.twitterService.tweetInbox(data).subscribe((res: any) => {

      this.sentTweets = res.value;
    }, err => {

    })
  }

  ngOnDestroy() {
    if (this.id) {
      clearInterval(this.id);
    }
  }
}
