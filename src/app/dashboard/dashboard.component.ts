import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../demo/service/dashboard.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
declare function openCustForm();
declare function blank();
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  enableEmailTable: boolean = false;
  agentid: any;
  loginData: any;
  campid: any;
  ticketTypeDrodown: any = [];
  selectedTicketTypeData: any;
  // enddate: Date;
  // startdate: Date;
  newTicketValueSet:any = true
  enddate: any;
  startdate: any;
  OpebCircle!: number;
  escalatedCircle!: number;
  closedCircle!: number;
  otherCircle!: number;
  emailagentWiseTableData: any = [];
  userType: any;
  sourceWiseTableData: any = [];
  statusWiseTableData: any = [];
  ticketTypeWiseTableData: any = [];
  emailWiseTableData: any = [];
  TicketHistoryWiseTableData: any = [];
  showTicketHistoryDialogue: boolean = false;
  showTicketTypeWiseHistoryDialogue: boolean = false;
  TicketTypeWiseTableData: any = [];
  constructor(private router: Router, private datePipe: DatePipe, private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.getUserDetails();
    this.loginResData();
    this.tabName();
    this.getSetStartEndDate();
  }

  getSetStartEndDate() {
    const startDate = sessionStorage.getItem("startdate");
    const endDate = sessionStorage.getItem("enddate");

    if (startDate && endDate) {
      this.startdate = new Date (startDate)
      this.enddate = new Date (endDate)
      
      
      this.getDashboardList();
      
    } else {
      this.enddate = new Date();
      this.enddate.setHours(23, 59, 59, 999);
      
      
      this.startdate = new Date();
      this.startdate.setHours(0, 0, 0, 0);
      
      this.getDashboardList();
    }


  }

  tabName() {
    localStorage.setItem('tabName', 'Dashboard')
  }


  getDashboardList() {
    

    let startDate: any;
    let endDate: any;
    if (this.startdate) {
      startDate = this.datePipe.transform(this.startdate, 'yyyy-MM-dd HH:mm:ss');
      
    }
      
    if (this.enddate) {
      endDate = this.datePipe.transform(this.enddate, 'yyyy-MM-dd HH:mm:ss');
      
    }
    let data = {
      "campID": this.campid,
      "userType": this.userType,
      "loginUserID": this.agentid,
      "startDate": startDate,
      "endDate": endDate,
      "arrSelectedTicket": this.selectedTicketTypeData
    }
    this.dashboardService.getDashboardList(JSON.stringify(data)).subscribe((res: any) => {

      this.ticketTypeDrodown = res.listtickettype;
      this.OpebCircle = res.open;
      this.escalatedCircle = res.escalated;
      this.closedCircle = res.closed;
      this.otherCircle = 0;
      this.sourceWiseTableData = res.listSourceWise;
      this.statusWiseTableData = res.listStatusWise;
      this.ticketTypeWiseTableData = res.listTicketTypeWise;
      this.emailWiseTableData = res.listEmailWise;
      this.emailagentWiseTableData = res.listEmailAgentWise;
    });
  }

  onReload() {
    
    


    sessionStorage.setItem("startdate", this.startdate);
    sessionStorage.setItem("enddate", this.enddate);
    this.getDashboardList();
  }

  getTicketType() {
    let startDate: any;
    let endDate: any;
    if (this.startdate) {
      startDate = this.datePipe.transform(this.startdate, 'yyyy-MM-dd HH:mm:ss');
    }
    if (this.enddate) {
      endDate = this.datePipe.transform(this.enddate, 'yyyy-MM-dd HH:mm:ss');
    }
    let data = {

      "campID": this.campid,
      "userType": this.userType,
      "loginUserID": this.agentid,
      "startDate": startDate,
      "endDate": endDate,
    }
    this.dashboardService.getTicketType(JSON.stringify(data)).subscribe((res: any) => {
      this.ticketTypeDrodown = res.value;
    });
  }

  //Login Data
  getUserDetails() {
    this.agentid = sessionStorage.getItem('agentId');
  }

  loginResData() {
    this.loginData = JSON.parse((localStorage.getItem("loginData")));


    for (let i = 0; i < this.loginData['value'].length; i++) {
      this.campid = this.loginData['value'][i]['campid'];
      this.userType = this.loginData['value'][i]['userType'];
      this.enableEmailTable = this.loginData.value[0].enableEmail;
    }
  }

  onSatusWise(item: any) {


    this.showTicketHistoryDialogue = true;
    let startDate: any;
    let endDate: any;
    if (this.startdate) {
      startDate = this.datePipe.transform(this.startdate, 'yyyy-MM-dd HH:mm:ss');
    }
    if (this.enddate) {
      endDate = this.datePipe.transform(this.enddate, 'yyyy-MM-dd HH:mm:ss');
    }
    let data = {
      "campID": this.campid,
      "userType": this.userType,
      "loginUserID": this.agentid,
      "isAllow_Campgroup_Dashboard": "true",
      "ticketStatusID": item.ticketStatusID,
      "startDate": startDate,
      "endDate": endDate,
    }
    this.dashboardService.getTicketHistoryData(JSON.stringify(data)).subscribe((res: any) => {
      this.TicketHistoryWiseTableData = res.value;


    })
  }

  onTicketTypeWiseSatusWise(item: any) {

    this.showTicketTypeWiseHistoryDialogue = true;
    let startDate: any;
    let endDate: any;
    if (this.startdate) {
      startDate = this.datePipe.transform(this.startdate, 'yyyy-MM-dd HH:mm:ss');
    }
    if (this.enddate) {
      endDate = this.datePipe.transform(this.enddate, 'yyyy-MM-dd HH:mm:ss');
    }
    let data = {
      "campID": this.campid,
      "userType": this.userType,
      "loginUserID": this.agentid,
      "isAllow_Campgroup_Dashboard": "true",
      "ticketTypeID": item.ticketTypeID,
      "startDate": startDate,
      "endDate": endDate,
    }
    this.dashboardService.getTicketTypeWise(JSON.stringify(data)).subscribe((res: any) => {
      this.TicketTypeWiseTableData = res.value;

    })
  }

  onTicketHistortStatus(item: any) {

    let data = {
      campID: this.campid,
      ticketID: item.fld_TicketID,
    }
    this.dashboardService.redirectTicketStatusWise(JSON.stringify(data)).subscribe((res: any) => {
      

      if (res.status == 'Success') {
        sessionStorage.setItem('phnno', JSON.parse(res.value).phoneNo);
        sessionStorage.setItem('phoneID', JSON.parse(res.value).phoneID);
        sessionStorage.setItem('ticketID', res.ticketID);
        sessionStorage.setItem('sendTicketDetails',this.newTicketValueSet)
        // this.router.navigateByUrl('iCallMate-cCP/customFormm');
        this.router.navigate(['customFormm'])
      }

    });

  }
  // disposition without ticketing dashboard end
  backToBlankPage(){
    this.router.navigateByUrl('iCallMate-cCP/blank2')
  }
}

