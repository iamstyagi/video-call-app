import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Mail } from 'src/app/model/mail';
import { MailService } from '../service/mail.service';

@Component({
    templateUrl: './mail-trash.component.html'
})
export class MailTrashComponent  implements OnInit {
    trashMails: Mail[] = [];
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
            this.loginData = JSON.parse(atob(localStorage.getItem("loginData")));
            for (let i = 0; i < this.loginData['value'].length; i++) {
                this.campid = this.loginData['value'][i]['campid'];
                this.userType = this.loginData['value'][i]['userType'];
                
                
            }
            
            this.getUserDetails();
        }
    }

    getUserDetails() {
        this.userDetails = JSON.parse(atob(localStorage.getItem("userDetails")));
        this.agentid = this.userDetails['agentid'];
        
        
    }

    getData() {
        let data = {
            loginUserID: this.agentid,
            campID: this.campid,
            userType: this.userType,
            selectedFolder: 'email-deleted',
            count: 10,
            // isfolderClick: this.isfolderClick
        }
        sessionStorage.setItem('selectedFolderValue','email-deleted')
        

        this.mailService.getEmailData(data).subscribe((res: any) => {
            
            this.trashMails = res.listemailDeletedRecords;
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