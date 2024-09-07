import { Component, OnInit } from '@angular/core';
import { SmsServiceService } from '../service/sms-service.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-new-sms',
  templateUrl: './new-sms.component.html',
  styleUrls: ['./new-sms.component.scss']
})
export class NewSmsComponent implements OnInit {
  phoneno:any;
  textArea:any;
  msg:any[] = [];
  loginData: any;
  campid: any;
  userType: any;
  agentid: any;
  
  constructor(private smsService: SmsServiceService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.loginResData();
  }


  loginResData() {
    this.loginData = JSON.parse((localStorage.getItem("loginData")));

    for (let i = 0; i < this.loginData['value'].length; i++) {
      this.campid = this.loginData['value'][i]['campid'];
      this.userType = this.loginData['value'][i]['userType'];
      this.agentid = sessionStorage.getItem('agentid');
    }
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
        this.msg = res.listISMSchat;
        this.textArea = '';
        this.messageService.add({ severity: 'info', summary: res.status, detail: 'Message Send Successfully' });
      }
    },err=>{
    })

  }
}
