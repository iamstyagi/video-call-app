import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../demo/service/dashboard.service';
import { DatePipe } from '@angular/common';
import { MessageService } from 'primeng/api';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'aprdashboard-component',
  templateUrl: './aprdashboard.component.html',
  styles: [
    `::ng-deep .p-datepicker .p-timepicker .p-link {
        color: #000 !important;
    }
    ::ng-deep .p-datatable .p-sortable-column .p-sortable-column-icon, .p-datatable .p-sortable-column .p-sortable-column-badge {
      vertical-align: middle;
      color: #fff !important;
    }`
  ]
})
export class AprdashboardComponent implements OnInit {
  activeIndex = 1;
  submitted: boolean;
  campid = "";
  agentid = "";
  userDetails: any;
  loginData: any;
  fromdate: any;
  todate: any;
  resGetAgentAprDetails: any = [];
  dispositionSummaryTableData: any = [];
  leadSetSummaryTableData: any = [];
  Names: string[] = [
    "Idle Time",
    "Talk Time",
    "ACW Time",
    "Hold Time",
    "Break Time",
    "Login Time",
    "Staffed Time",
    "Active Time",
  ];
  parentDispoition: any[];
  subDispoition: any[];
  agentSummarArray: any[];
  parentDispoitionValue: any
  subDispoitionValue: any;
  mob_no: any;
  enableDashPhoneSearch: boolean = false;
  constructor(
    private agentAprDetails: DashboardService,
    private datePipe: DatePipe,
    private messageService: MessageService,
    private sanitizer: DomSanitizer,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getUserDetails();
    this.loginResData();
    this.showTabs();
    this.getagentaprdetails();
    this.parentDispoitionValueagent()
  }

  //Login Data
  getUserDetails() {
    this.agentid = sessionStorage.getItem('agentId');
  }

  loginResData() {
    this.loginData = JSON.parse((localStorage.getItem("loginData")));
    for (let i = 0; i < this.loginData['value'].length; i++) {
      this.campid = this.loginData['value'][i]['campid'];
      this.enableDashPhoneSearch = this.loginData['value'][i]['enableDashPhoneSearch'];
    }
  }

  allowAPRDashboard: boolean = false;
  allowAgentSummaryDash: boolean = false;
  allowLeadSetSummaryDash: boolean = false;
  showTabs() {
    if (this.loginData.value[0].allowAPRDashboard == true) {
      this.allowAPRDashboard = true;
      this.activeIndex=1;
    }
    else {
      this.allowAPRDashboard = false;
    }
    if (this.loginData.value[0].allowAgentSummaryDash == true) {
      this.allowAgentSummaryDash = true;
      // let fromdate= new Date();
      // fromdate.setHours(0);
      // fromdate.setMinutes(0);
      // fromdate.setSeconds(1);
      // this.fromdate=fromdate;

      // let todate= new Date();
      // todate.setHours(23);
      // todate.setMinutes(59);
      // todate.setSeconds(59);
      // this.todate=todate;
      this.activeIndex=2;
      this.getAgentSummaryDetailsNew(0);
    }
    else {
      this.allowAgentSummaryDash = false;
    }
    if (this.loginData.value[0].allowLeadSetSummaryDash == true) {
      this.allowLeadSetSummaryDash = true;
    }
    else {
      this.allowLeadSetSummaryDash = false;
    }
  }


  getagentaprdetails() {
    this.resGetAgentAprDetails = [];
    this.submitted = true;
    let payLoad = {
      "campid": this.campid,
      "agentid": this.agentid
    }
    this.agentAprDetails.getagentaprdetails(payLoad).subscribe(
      (data: any) => {
        if(data.status == 'success'){
          let res: any = data['value'];
          for (let i = 0; i < res.length; i++) {
            this.resGetAgentAprDetails.push(res[i]);
          }
        }else{
          this.resGetAgentAprDetails = []
        }
       
      }
    )
  }

  onTabClick() {
    if (this.activeIndex == 2) {
      // this.todate = new Date();
      // this.fromdate = new Date();
      // this.fromdate.setHours(0, 0, 0);

      let data = {
        "campaignID": this.campid,
        "startDate": new Date(),
        "endDate": new Date(),
      }

      this.agentAprDetails.getDashboardSummary(JSON.stringify(data)).subscribe((res: any) => {
        if (res && res.length != 0) {
          this.leadSetSummaryTableData = res.value;
          this.dispositionSummaryTableData = res.data1;
        }
      });
    }
    else if (this.activeIndex == 0) {
      this.router.navigateByUrl('iCallMate-cCP/blank2')
    }
  }

  onSearch() {
    let data = {
      "campaignID": this.campid,
      "startDate": this.fromdate,
      "endDate": this.todate,
    }

    this.agentAprDetails.getDashboardSummary(JSON.stringify(data)).subscribe((res: any) => {
      if (res && res.length != 0) {
        this.leadSetSummaryTableData = res.value;
        this.dispositionSummaryTableData = res.data1;
      }
    })
  }

  // dropdown
  onSelectedCampaign(value) {
    this.subDispoitionValue = "";
  }


  onSelectedCampaignSub(value) { }
  parentDispoitionValueagent() {
    this.agentAprDetails.getParentDispositionDetails(this.campid).subscribe(
      (res) => {

        if (res) {
          this.parentDispoition = res['data'];
        }
      });

  }
  subDispoitionValueagent() {
    this.agentAprDetails.getSubDispoitionId(this.campid, this.parentDispoitionValue).subscribe(
      (res) => {
        if (res) {
          this.subDispoition = res['data'];
        }
      });
  }

  rowId = 0;
  getAgentSummaryDetailsNew(item) {
    const date1 = new Date(this.fromdate);
    const date2 = new Date(this.todate);
    const differenceInMs = Math.abs(date1.getTime() - date2.getTime());
    const sevenDaysInMs = 30 * 24 * 60 * 60 * 1000;

    if (differenceInMs < sevenDaysInMs || differenceInMs === sevenDaysInMs) {

      let data;
      if (item == 0) {
        data = {
          "campaignID": Number(this.campid),
          "startDate": this.fromdate,
          "endDate": this.todate,
          "dispId": this.subDispoitionValue ? this.subDispoitionValue : this.parentDispoitionValue,
          "loginAgentId": this.agentid,
          "phoneNumber": this.mob_no,
          "rowId": 0
        }
      }
      else {
        data = {
          "campaignID": Number(this.campid),
          "startDate": this.fromdate,
          "endDate": this.todate,
          "dispId": this.subDispoitionValue ? this.subDispoitionValue : this.parentDispoitionValue,
          "loginAgentId": this.agentid,
          "phoneNumber": this.mob_no,
          "rowId": this.rowId
        }
      }


      this.agentAprDetails.getAgentData(data).subscribe(
        (res) => {
          if (res.status == 'Success') {
            this.agentSummarArray = res['data'];
            const largestObject = this.agentSummarArray.reduce((prev, current) => {
              return (prev.rowId > current.rowId) ? prev : current;
            }, {});
            this.rowId = largestObject.rowId;
            this.messageService.add({ severity: 'info', summary: res.status, detail: res.message });
            // this.onSearch()
          } else {
            this.agentSummarArray = []
            this.messageService.add({ severity: 'info', summary: res.status, detail: res.message });

          }
        });
    } else {
      this.messageService.add({ severity: 'info', summary: 'info', detail: 'Date Difference can not be more than 30 days.' });
    }
  }

  retundata(mydata){
let dataC = new Date(mydata);
return dataC
  }
  resetData() {
    this.subDispoitionValue = '';
    this.parentDispoitionValue = '';
    this.agentSummarArray = []
  }

  convertByteArrayToAudioURL(byteArray: string): SafeUrl {
    const audioBlob = new Blob([this.base64ToArrayBuffer(byteArray)], { type: 'audio/wav' });
    const httpFilePathURL = URL.createObjectURL(audioBlob);
    return this.sanitizer.bypassSecurityTrustUrl(httpFilePathURL);
  }

  base64ToArrayBuffer(base64: string): ArrayBuffer {
    const binaryString = window.atob(base64);
    const length = binaryString.length;
    const bytes = new Uint8Array(length);
    for (let i = 0; i < length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  }

}