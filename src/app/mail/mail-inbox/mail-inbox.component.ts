import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Mail } from 'src/app/model/mail';
import { MailService } from '../service/mail.service';
// import { setInterval } from 'timers';

@Component({
    templateUrl: './mail-inbox.component.html',
})
export class MailInboxComponent implements OnInit {

    mails: Mail[] = [];
    agentid: any;
    campid: any;
    userType: any;
    loginData: any;
    userDetails: any;
    id: any;
    isauto: boolean = false;
    interval: any;
    isfolderClick: boolean = true;
    ApiRefreshTime:any = '60000';

    constructor(private mailService: MailService, private router: Router) {
    }

    ngOnInit() {
        this.loginResData();
        this.getData();
        this.mailService.emailUpdateReceive().subscribe(() => {
            this.getData();
        })

        // this.id = setInterval(()=>{
        //     this.getData();
        // },60000)
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
        let dataaaa = {
            loginUserID: this.agentid,
            campID: this.campid,
            userType: this.userType,
            selectedFolder: 'email-inbox',
            // isauto: true,
            count: 10,
            isfolderClick: this.isfolderClick
        }

        sessionStorage.setItem('selectedFolderValue','email-inbox')

        this.mailService.getEmailData(JSON.stringify(dataaaa)).subscribe((res: any) => {

            this.mails = res.listEmailInboxRecords
            if (res) {
                this.emailListInLoop();
                // this.isfolderClick = false;
            }
        }, err => {

        })
    }

    emailListInLoop() {
        this.interval = setInterval(() => {
            this.setData();
        }, 60000)
    }

    setData() {
        let dataaaa = {
            loginUserID: this.agentid,
            campID: this.campid,
            userType: this.userType,
            selectedFolder: 'email-inbox',
            // isauto: false,
            count: 10,
            isfolderClick: this.isfolderClick
        }
        sessionStorage.setItem('selectedFolderValue','email-inbox')


        this.mailService.getEmailData(JSON.stringify(dataaaa)).subscribe((res: any) => {
            this.ApiRefreshTime = res.ApiRefreshTime

            // this.mails = res.listEmailInboxRecords
            // Check if res.listEmailInboxRecords exists and is an array
            // if (Array.isArray(res.listEmailInboxRecords)) {
            //     // Initialize this.mails as an array if it isn't already
            //     this.mails = this.mails || [];

            //     // Append the new data to the existing data
            //     this.mails = [...this.mails, ...res.listEmailInboxRecords];
            // }
            // this.isfolderClick = false;
        }, err => {

        })
    }

    ngOnDestroy() {
        // if (this.id) {
        //   clearInterval(this.id);
        // }
        clearInterval(this.interval)
    }
}