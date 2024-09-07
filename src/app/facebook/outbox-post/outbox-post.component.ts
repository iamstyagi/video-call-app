import { Component, OnInit } from '@angular/core';
import { FBserviceService } from '../services/f-bservice.service';

@Component({
  selector: 'app-outbox-post',
  templateUrl: './outbox-post.component.html',
  styleUrls: ['./outbox-post.component.scss']
})
export class OutboxPostComponent implements OnInit {
  outboxPosts:any[] = [];
  loginData:any;
  campid:any;
  userType:any;
  agentid:any;
  id:any;
  constructor(private fbService: FBserviceService) { }

  ngOnInit(): void {
    this.loginResData();
    this.getOutboxData();
    
    
    this.id = setInterval(() => {
      this.getOutboxData();
    }, 60000)
  }

  loginResData() {
    this.loginData = JSON.parse((localStorage.getItem("loginData")));
    

    this.campid = this.loginData.value[0].campid;
    this.userType = this.loginData.value[0].userType;
    this.agentid = sessionStorage.getItem('agentid');
  }

  getOutboxData(){
    let data = {
      campID: this.campid,
      userType: this.userType,
      loginUserID: this.agentid,
      selectedFolder: "facebook-outbox"
    }
    

    this.fbService.getDataofLabels(data).subscribe((res:any)=>{
      
      this.outboxPosts = res.value
    },err=>{
      
    })
    
  }

  ngOnDestroy() {
    if (this.id) {
      clearInterval(this.id);
    }
  }

}
