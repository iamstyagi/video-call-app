import { Component, OnInit } from '@angular/core';
import { FBserviceService } from '../services/f-bservice.service';

@Component({
  selector: 'app-sent-post',
  templateUrl: './sent-post.component.html',
  styleUrls: ['./sent-post.component.scss']
})
export class SentPostComponent implements OnInit {
  sentPosts:any[] = [];
  loginData:any;
  campid:any;
  userType:any;
  agentid:any;
  id:any;
  constructor(private fbService: FBserviceService) { }

  ngOnInit(): void {
    this.loginResData();
    this.getSentData();

        
    this.id = setInterval(() => {
      this.getSentData();
    }, 60000)
  }

  loginResData() {
    this.loginData = JSON.parse((localStorage.getItem("loginData")));
    

    this.campid = this.loginData.value[0].campid;
    this.userType = this.loginData.value[0].userType;
    this.agentid = sessionStorage.getItem('agentid');
  }

  getSentData(){
    let data = {
      campID: this.campid,
      userType: this.userType,
      loginUserID: this.agentid,
      selectedFolder: "facebook-sent"
    }
    

    this.fbService.getDataofLabels(data).subscribe((res:any)=>{
      
      this.sentPosts = res.value
    },err=>{
      
    })
    
  }

  ngOnDestroy() {
    if (this.id) {
      clearInterval(this.id);
    }
  }

}
