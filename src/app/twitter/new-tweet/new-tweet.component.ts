import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TwitterService } from '../services/twitter.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-new-tweet',
  templateUrl: './new-tweet.component.html',
  styleUrls: ['./new-tweet.component.scss']
})
export class NewTweetComponent implements OnInit {
  fromArr: any[] = [];
  from: any;
  to: any;
  tweet: any;

  agentid: any;
  campid: any;
  userType: any;
  loginData: any;

  constructor(private route: ActivatedRoute, private twitterService: TwitterService, private messageService: MessageService,) { }

  ngOnInit(): void {
    this.loginResData();
  }

  loginResData() {
    this.loginData = JSON.parse((localStorage.getItem("loginData")));
    

    this.campid = this.loginData.value[0].campid;
    this.userType = this.loginData.value[0].userType;
    this.agentid = sessionStorage.getItem('agentid');
  }

  sendTweet() {
    let data = {
      
    }

    this.twitterService.sendReplyTweets(data).subscribe((res: any) => {
      
    }, err => {
      
    })
  }
}
