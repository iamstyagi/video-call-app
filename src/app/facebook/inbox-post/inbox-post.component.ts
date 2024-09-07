import { Component, OnInit } from '@angular/core';
import { FBserviceService } from '../services/f-bservice.service';

@Component({
  selector: 'app-inbox-post',
  templateUrl: './inbox-post.component.html',
  styleUrls: ['./inbox-post.component.scss']
})
export class InboxPostComponent implements OnInit {
  inboxPosts:any[] = [];
  loginData:any;
  campid:any;
  userType:any;
  agentid:any;
  id:any;
  constructor(private fbService: FBserviceService) { }

  ngOnInit(): void {
    this.loginResData();
    this.getInboxData();
        
    this.id = setInterval(() => {
      this.getInboxData();
    }, 60000)
  }

  loginResData() {
    this.loginData = JSON.parse((localStorage.getItem("loginData")));
    

    this.campid = this.loginData.value[0].campid;
    this.userType = this.loginData.value[0].userType;
    this.agentid = sessionStorage.getItem('agentid');
  }

  getInboxData(){
    let data = {
      campID: this.campid,
      userType: this.userType,
      loginUserID: this.agentid,
      // loginUserID: "1006",
      selectedFolder: "facebook-inbox"
    }
    

    this.fbService.getDataofLabels(data).subscribe((res:any)=>{
      
      this.inboxPosts = res.value
    },err=>{
      
    })
    
  }

  ngOnDestroy() {
    if (this.id) {
      clearInterval(this.id);
    }
  }
}
