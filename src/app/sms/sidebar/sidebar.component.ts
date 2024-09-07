import { Component, NgZone, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { SmsServiceService } from '../service/sms-service.service';
import { async } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  selectedIndex: number | null = null;
  loginData: any;
  campid: any;
  userType: any;
  agentid: any;
  items: any[] = [];

  newNumberDialog:boolean = false;
  newNo:any = 91;
  textArea:any;

  constructor(private router: Router, private zone: NgZone, private smsService: SmsServiceService, private messageService: MessageService) {
  }
  ngOnInit(): void {
    this.loginResData();
    this.getContacts();

    setInterval(() => {
      this.getContacts();
    }, 5000)

    this.selectedIndex = this.selectedIndex - 1;
  }

  loginResData() {
    this.loginData = JSON.parse((localStorage.getItem("loginData")));

    for (let i = 0; i < this.loginData['value'].length; i++) {
      this.campid = this.loginData['value'][i]['campid'];
      this.userType = this.loginData['value'][i]['userType'];
      this.agentid = sessionStorage.getItem('agentid');
    }
  }

  async getContacts() {
    let data = {
      loginUserID: this.agentid
      // loginUserID: "1006"
    }

    await this.smsService.getSMSContacts(data).subscribe((res: any) => {
      this.items = res.listContact
    })
  }

  navigate(index) {
    this.selectedIndex = index;
    this.router.navigate(['iCallMate-cCP/sms/sms-box']);
  }

  navigateNew() {
    this.selectedIndex = this.items.length;
    this.router.navigate(['iCallMate-cCP/sms/new-sms']);
    this.newNumberDialog = true;
  }

  sendMobileNo(number: any) {
    this.smsService.shareMobileNumber(number);
  }

  sendText() {
    let data = {
      loginUserID: this.agentid,
      // loginUserID: "1006",
      text: this.textArea,
      phoneno: this.newNo
    }
    this.smsService.sendSMSMsg(data).subscribe((res: any) => {
      if(res.status == 'Success'){
        this.newNumberDialog = false;
        this.messageService.add({ severity: 'success', summary: "Message Sent", detail: '' });
        // this.selectedIndex = this.selectedIndex - 1;
        this.newNo = '';
        this.newNo = 91;
        this.textArea = '';
      }
    },err=>{
    })

  }

}
