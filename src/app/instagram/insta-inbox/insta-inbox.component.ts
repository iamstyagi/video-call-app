import { Component, OnInit } from '@angular/core';
import { InstagramService } from '../services/instagram.service';
@Component({
  selector: 'app-insta-inbox',
  templateUrl: './insta-inbox.component.html',
  styleUrls: ['./insta-inbox.component.scss']
})
export class InstaInboxComponent implements OnInit {
  inboxPosts:any[] = [];
  loginData:any;
  id:any;
  
  constructor(private InstagramService:InstagramService){}
  ngOnInit(): void {
    this.loginResData();
    this.getInboxData();
    
    this.id = setInterval(() => {
      this.getInboxData();
    }, 60000)
  }

  loginResData() {
    this.loginData = JSON.parse((localStorage.getItem("loginData")));
    
  }

  getInboxData(){
    let data = {
      campID: this.loginData.value[0].campid,
      userType: this.loginData.value[0].userType,
      LoginUserID: sessionStorage.getItem('agentid'),
      selectedFolder: "instagram-inbox"
    }
    
    this.InstagramService.getTableData(JSON.stringify(data)).subscribe((res:any)=>{
      this.inboxPosts=JSON.parse(res.value);
    })
    
  }

  ngOnDestroy() {
    if (this.id) {
      clearInterval(this.id);
    }
  }
}
