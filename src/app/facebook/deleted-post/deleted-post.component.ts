import { Component, OnInit } from '@angular/core';
import { FBserviceService } from '../services/f-bservice.service';

@Component({
  selector: 'app-deleted-post',
  templateUrl: './deleted-post.component.html',
  styleUrls: ['./deleted-post.component.scss']
})
export class DeletedPostComponent implements OnInit {
  deletedPosts:any[] = [];
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
      selectedFolder: "facebook-deleted"
    }
    

    this.fbService.getDataofLabels(data).subscribe((res:any)=>{
      
      this.deletedPosts = res.value
    },err=>{
      
    })
    
  }

}
