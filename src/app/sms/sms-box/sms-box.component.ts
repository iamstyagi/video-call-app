import { Component, OnInit } from '@angular/core';
import { SmsServiceService } from '../service/sms-service.service';

@Component({
  selector: 'app-sms-box',
  templateUrl: './sms-box.component.html',
  styleUrls: ['./sms-box.component.scss']
})
export class SmsBoxComponent implements OnInit {
  templates: any[] = [];
  seelectedTemplate: any;
  phoneno: any;
  msg: any[] = [];
  loginData: any;
  campid: any;
  userType: any;
  agentid: any;
  textArea:any;


  constructor(private smsService: SmsServiceService) { }

  ngOnInit(): void {
    this.loginResData();
    this.smsService.sharedNumber.subscribe((res) => {
      this.phoneno = res;
      this.loadSMSChat();
    })
  
    setInterval(() => {
      this.loadSMSChat();
    }, 1200)

  }

  loginResData() {
    this.loginData = JSON.parse((localStorage.getItem("loginData")));

    for (let i = 0; i < this.loginData['value'].length; i++) {
      this.campid = this.loginData['value'][i]['campid'];
      this.userType = this.loginData['value'][i]['userType'];
      this.agentid = sessionStorage.getItem('agentid');
    }
  }

  loadSMSChat() {
    let data = {
      phoneno: this.phoneno
    }

    this.smsService.loadSMSChat(data).subscribe((res: any) => {
      this.msg = res.listChats
    }, err => {
    })
  }


  sendText() {
    let data = {
      loginUserID: this.agentid,
      // loginUserID: "1006",
      text: this.textArea,
      phoneno: this.phoneno
    }
    this.smsService.sendSMSMsg(data).subscribe((res: any) => {
      if(res.status == 'Success'){
        this.textArea = '';
      }
    },err=>{   
    })

  }

}
