import { Component, OnInit } from '@angular/core';
import { FBserviceService } from '../services/f-bservice.service';

@Component({
  selector: 'app-queue-post',
  templateUrl: './queue-post.component.html',
  styleUrls: ['./queue-post.component.scss']
})
export class QueuePostComponent implements OnInit {
  queuePosts: any[] = [];
  loginData: any;
  campid: any;
  userType: any;
  agentid: any;
  id:any;
  constructor(private fbService: FBserviceService) { }

  ngOnInit(): void {
    this.loginResData();
    this.getQueueData();

    this.id = setInterval(() => {
      this.getQueueData();
    }, 60000)
  }

  loginResData() {
    this.loginData = JSON.parse((localStorage.getItem("loginData")));


    this.campid = this.loginData.value[0].campid;
    this.userType = this.loginData.value[0].userType;
    this.agentid = sessionStorage.getItem('agentid');
  }

  getQueueData() {
    let data = {
      campID: this.campid,
      userType: this.userType,
      loginUserID: this.agentid,
      selectedFolder: "facebook-queue"
    }


    this.fbService.getDataofLabels(data).subscribe((res: any) => {

      this.queuePosts = res.value
    }, err => {

    })

  }

  ngOnDestroy() {
    if (this.id) {
      clearInterval(this.id);
    }
  }
}
