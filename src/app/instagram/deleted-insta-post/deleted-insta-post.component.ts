import { Component, OnInit } from '@angular/core';
import { InstagramService } from '../services/instagram.service';

@Component({
  selector: 'app-deleted-insta-post',
  templateUrl: './deleted-insta-post.component.html',
  styleUrls: ['./deleted-insta-post.component.scss']
})
export class DeletedInstaPostComponent implements OnInit {
  inboxPosts:any[] = [];
  loginData:any;
  id:any;
  
  constructor(private InstagramService:InstagramService){}
  ngOnInit(): void {
    this.loginResData();
    this.getInboxData();
    
    // this.id = setInterval(() => {
    //   this.getInboxData();
    // }, 60000)
  }

  loginResData() {
    this.loginData = JSON.parse((localStorage.getItem("loginData")));
    
  }

  getInboxData(){
    let data = {
      campID: this.loginData.value[0].campid,
      userType: this.loginData.value[0].userType,
      LoginUserID: sessionStorage.getItem('agentid'),
      selectedFolder: "instagram-deleted"
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
