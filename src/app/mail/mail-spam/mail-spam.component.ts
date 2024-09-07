import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Mail } from 'src/app/model/mail';
import { MailService } from '../service/mail.service';

@Component({
    templateUrl: './mail-spam.component.html'
})
export class MailSpamComponent implements OnInit {

    spamMails: Mail[] = [];
    agentid: any;
    campid: any;
    userType: any;
    loginData: any;
    userDetails: any;
    id:any;
    isfolderClick : boolean = true;

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
        let spamdata = {
            loginUserID: this.agentid,
            campID: this.campid,
            userType: this.userType,
            selectedFolder: 'email-spam',
            count: 10,
            // isfolderClick: this.isfolderClick
        }
        sessionStorage.setItem('selectedFolderValue','email-spam')
        

        this.mailService.getEmailData(JSON.stringify(spamdata)).subscribe((res: any) => {
            
            this.spamMails = res.listEmailSpamRecords;
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