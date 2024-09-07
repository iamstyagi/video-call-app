import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Mail } from 'src/app/model/mail';
import { MailService } from '../service/mail.service';

@Component({
selector: 'mail-draft-component',
templateUrl: './mail-draft.component.html',
styleUrls: ['./mail-draft.component.scss']
})
export class MailDraftComponent implements OnInit {
    draftMails: Mail[] = [];
    agentid: any;
    campid: any;
    userType: any;
    loginData: any;
    userDetails: any;
    id:any;
    isfolderClick:boolean = true;

    constructor(private mailService: MailService, private router: Router) {
    }

    ngOnInit() {
        this.loginResData();
        this.getData();
        this.mailService.emailUpdateReceive().subscribe(()=>{
            this.getData();
        })
        this.id = setInterval(()=>{
            this.getData();
        },60000)
    }

    loginResData() {
        if (localStorage.getItem("loginData")) {
            this.loginData = JSON.parse(localStorage.getItem("loginData"));
            for (let i = 0; i < this.loginData['value'].length; i++) {
                this.campid = this.loginData['value'][i]['campid'];
                this.userType = this.loginData['value'][i]['userType'];
                
                
            }
            
            this.getUserDetails();
        }
    }

    getUserDetails() {
        this.agentid = sessionStorage.getItem('agentid');
    }

    getData() {
        let draftData = {
            loginUserID: this.agentid,
            campID: this.campid,
            userType: this.userType,
            selectedFolder: 'email-draft',
            count: 10,
            isfolderClick:this.isfolderClick
        }
        sessionStorage.setItem('selectedFolderValue','email-draft')

        this.mailService.getEmailData(draftData).subscribe((res: any) => {
            
            this.draftMails = res.listemaildraftRecords;
            // this.isfolderClick = false;
        }, err => {
            
        })
    }

    ngOnDestroy() {
        if (this.id) {
          clearInterval(this.id);
        }
      }
}