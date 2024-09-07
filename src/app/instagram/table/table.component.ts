import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { InstagramService } from '../services/instagram.service';
import { Url } from 'url';
import { CustomService } from 'src/app/demo/service/custom.service';
import { DatePipe } from '@angular/common';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormField } from 'src/app/form-field';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [DatePipe, MessageService]
})
export class TableComponent implements OnInit {
  loginData: any;
  @Input() instaPosts: any[] = [];
  selectedPosts: any;
  showInstaDialoge: boolean = false;
  comment: any;
  tableResponse: any;
  instaRowImage: Url;
  commentText: any;
  ticketInformation: any;
  historyDialogBox: boolean = false;
  ticketTypeHistory: any = [];
  updatedValue1: any = "Update";
  updateDisable1: boolean = true;
  commentText1: any;
  ticketEnable: boolean = false;
  // ticket variables use for historu and update

  ticketHistoryDialog: boolean = false;
  noOfTables: any[] = [];
  formFields: any[];
  customForm: FormGroup;
  getDynamicFormFieldsCache: any;
  phoneDataa: any;
  phoneid:any
  newVariableFalseTrueCheck:boolean = environment.newVariableFalseTrueCheck
  phoneData: any;
  // for ticket
getUdatedDialogData:boolean = false
showUpdateButton: boolean = false;
showSaveButton: boolean = false;
showTicketCard: boolean = false;
selectedAssignedBy: any;
disabledTicketFields: boolean = true;
ticketRecords: any = [];
voicefile: any;
ticketNo: any;  ticketCampaignName: any; actionNo: any;  ticketDuration: any;
selectedticketStatus: any;
ticketTypeDropdownData: any[] = [];
selectedTicketType: any[] = [];
newTicketFlag: boolean = false;
ticketStatusDropdownData: any = [];
ticketFields: any = [];
ticketStartTimeUpdate: any;
tree: any;
disposeCall: boolean = true;
selectedDisposeCall: any;
ticketForm: FormGroup;
ticketRecordsValueComman: any = [];
selectedCallBack: boolean;
date: Date = new Date();
dispositionID;
solutionValue;
feedbackValue;
remarksValue;
schoolCodeValue:any
schoolNameValue:any
districtValue:any
blockNameValue:any
problemReportedValue:any
showDynaTicketCard: boolean = false;
agentRemarks: any;
sourceName: any;
 ticketTime: any;
 ticketID: any;
 callID: any;
 agentid: any;
 abc: any = [];
 arrObj: number[] = new Array(1);
 acName:any
 ticketSaved: boolean = false;
 valueSaveTrue: boolean = false;
 selectedAssignedTo: any;
 myValueDetails:any
 ticketValue:any
 viewPostDetails:any = 'View Post'
  constructor(private messageService: MessageService, private datePipe: DatePipe, private InstagramService: InstagramService, private customService: CustomService,   private cdr: ChangeDetectorRef,
    private fb: FormBuilder ) { 
      this.ticketForm = this.fb.group({

      });
    }

  ngOnInit(): void {
    this.loginResData();
  }

  loginResData() {
    this.loginData = JSON.parse((localStorage.getItem("loginData")));
    this.agentid = sessionStorage.getItem('agentid');
    this.ticketEnable = this.loginData['value'][0]['ticketEnable'] != null ? this.loginData['value'][0]['ticketEnable'] : true;

  }


  onRowSelect(item: any) {
    this.viewPostDetails = item.caption
    this.showInstaDialoge = true;
    this.commentText = [];
    this.instaRowImage = item.media_url;
    this.comment = '';

    let data = {
      "LoginUserID": sessionStorage.getItem('agentid'),
      "userType": this.loginData.value[0].userType,
      "campID": this.loginData.value[0].campid,
      "objClsIGProperties": {
        "fld_ticketid": item.fld_ticketid,
        "id": item.id
      }
    }
    this.InstagramService.onRowSelectInsta(JSON.stringify(data)).subscribe((res: any) => {
      this.commentText1 = JSON.parse(res.objClsIGProperties);
      if (res && res.length != 0) {
        this.tableResponse = res;
        this.commentText = JSON.parse(this.tableResponse.listIgCommentsRecors);

        this.ticketInformation = JSON.parse(this.tableResponse.listTicketRecords);

        if (this.ticketInformation.length != 0) {
          this.customService.getTicketStatus(data).subscribe((res: any) => {
            this.ticketInformation[0].statusList = res;
          });
        }
      }
    });
  }


  onComment() {
    let id, username;
    if (this.commentText1) {
      id = this.commentText1.id,
        username = this.commentText1.username
    }

    let data = {
      "LoginUserID": sessionStorage.getItem('agentid'),
      "userType": this.loginData.value[0].userType,
      "campID": this.loginData.value[0].campid,
      "objClsIGProperties": {
        "id": id,
        "text": this.comment,
        "username": username
      }
    }
    this.InstagramService.sendComment(JSON.stringify(data)).subscribe((res: any) => {
      if (res.status == 'success') {
        this.comment = "";
        this.commentText = (JSON.parse(res.listIgCommentsRecors));
      }
    });
  }

  onHistory(ticketID: any) {
    this.historyDialogBox = true;
    this.customService.getTicketHistoryData(this.loginData.value[0].campid, ticketID).subscribe((res: any) => {
      this.ticketTypeHistory = res.value;
    });
  }

  onUpdate() {
    if (this.updatedValue1 == 'Update') {
      this.updatedValue1 = 'Save'
      this.updateDisable1 = false;
      this.messageService.add({ severity: 'info', summary: 'info', detail: 'You can Update the Ticket' })
    }
    else {

      let formatedDate = new Date(this.ticketInformation[0].start_Time);
      let ticketStartTimeUpdate = this.datePipe.transform(formatedDate, 'yyyy-MM-dd HH:mm:ss.S');
      let ticketTime = new Date(this.ticketInformation[0].ticket_Time);
      let ticketStartTime = this.datePipe.transform(ticketTime, 'yyyy-MM-dd HH:mm:ss.S');
      let data = {
        phoneID: this.ticketInformation[0].phoneID,
        ticketStartTime: ticketStartTimeUpdate,
        source_Type: this.ticketInformation[0].source_Type,
        source_ID: this.ticketInformation[0].source_ID,
        call_Time: this.ticketInformation[0].call_Time,
        ticket_closureID: this.ticketInformation[0].ticket_closureID,
        loginUserID: sessionStorage.getItem('agentid'),
        userType: this.loginData.value[0].userType,
        campID: this.loginData.value[0].campid,
        ticketID: this.ticketInformation[0].ticketID,
        sourceName: this.ticketInformation[0].sourceName,
        campName: this.ticketInformation[0].campName,
        action_No: this.ticketInformation[0].action_No,
        ticket_Time: ticketStartTime,
        ticketTime: this.ticketInformation[0].ticketTime,
        assignedByID: this.ticketInformation[0].assignedByID,
        ticket_statusID: this.ticketInformation[0].ticket_StatusName,
        remarks: this.ticketInformation[0].remarks,
        ticket_TypeID: this.ticketInformation[0].ticket_TypeID,
        callInvokeID: this.ticketInformation[0].callInvokeID
      }
      this.customService.saveTicketData(JSON.stringify(data)).subscribe((res: any) => {
        if (res.status == 'Success') {
          this.messageService.add({ severity: 'info', summary: res.status, detail: res.value })
          this.updatedValue1 = 'Update';
          this.updateDisable1 = true;
        }
        else {
          this.messageService.add({ severity: 'info', summary: res.status, detail: res.value })
        }
      });
    }
  }
 
  getFileExtension(url: string): string {
    const parsedUrl = new URL(url);
    const pathname = parsedUrl.pathname;
    return pathname.substring(pathname.lastIndexOf('.') + 1).toLowerCase();
  }

  isImage(url: string): boolean {
    const imageExtensions = ['png', 'jpg', 'jpeg', 'webp', 'gif'];
    const extension = this.getFileExtension(url);
    return imageExtensions.includes(extension);
  }

  isVideo(url: string): boolean {
    const videoExtensions = ['mp4', 'webm', 'avi', 'mkv'];
    const extension = this.getFileExtension(url);
    return videoExtensions.includes(extension);
  }

  // ticket code 
  
  ticketHistory(data1) {
    this.noOfTables = [];
this.phoneid = data1.phoneID
    let data = {
        campID: this.loginData.value[0].campid,
        // ticketID: data1.ticketID 
        ticketID: data1.ticketid ? data1.ticketid : data1.ticketID
    }


    this.InstagramService.getTicketHistory(data).subscribe((res: any) => {

        this.noOfTables = res.value;

    }, err => {

    })
    
    this.ticketHistoryDialog = true;
    this.getDynamicFormFields()                 
   
}
ticketHistory1(data1) {
    this.noOfTables = [];

    let data = {
        campID: this.loginData.value[0].campid,
        ticketID: data1
    }


    this.InstagramService.getTicketHistory(data).subscribe((res: any) => {

        this.noOfTables = res.value;


    }, err => {

    })
    this.ticketHistoryDialog = true;
    this.getDynamicFormFields()
}
getDynamicFormFields() {
  if (sessionStorage.getItem("getDynamicFormFieldsCache") && JSON.parse(sessionStorage.getItem("getDynamicFormFieldsCache")).campid == this.loginData.value[0].campid) {
      this.formFields = JSON.parse(sessionStorage.getItem("getDynamicFormFieldsCache")).data;
      const formGroupControls = {};
      this.getDynamicLeadCustField();
      for (const field of this.formFields) {
          formGroupControls[field.fld_FieldName] = [field.value || ''];
      }
      this.customForm = this.fb.group(formGroupControls);

  } else {
      let payLoad = {
          "campid": this.loginData.value[0].campid,
      }
      this.InstagramService.getFormFields(payLoad).subscribe(
          (data: FormField) => {

              data = data['value'];
              let formFields = Object.values(data);
              this.formFields = formFields.sort((a, b) => a.reportDisplaySeqNo - b.reportDisplaySeqNo);
              this.getDynamicFormFieldsCache = {
                  "campid":this.loginData.value[0].campid,
                  data: this.formFields
              }
              sessionStorage.setItem("getDynamicFormFieldsCache", JSON.stringify(this.getDynamicFormFieldsCache))
              const formGroupControls = {};
              this.getDynamicLeadCustField();
              for (const field of this.formFields) {
                  formGroupControls[field.fld_FieldName] = [field.value || ''];
              }
              this.customForm = this.fb.group(formGroupControls);
          });
  }


}
   // getData
   async getDynamicLeadCustField() {
    try {
        let payLoad = {
            "campid": this.loginData.value[0].campid,
            "phoneid": this.phoneid,
            "mode": "1",
            // "fld_phoneno": sessionStorage.getItem('phnno'),
            // "sourceType": "3" 
        }
        this.InstagramService.getLeadCustField(payLoad).subscribe(
            async (data) => {
                const parsedData = JSON.parse(data['value']);
                this.phoneDataa = parsedData

                if (parsedData.status == 'success') {
                    this.phoneid = '';
                    this.phoneid = parsedData.phoneid; // added for incoming.
                    let ticketId;
                    let ticketData = {
                        campid: this.loginData.value[0].campid,
                        ticketid: ticketId,
                        custid: this.phoneid
                    }
                    // await this.getTicketInformation(ticketData);
                    // if (this.sourceName == 'Twitter') {
                    //     this.liveDM = true;
                    // }
                    // else {
                    //     this.liveDM = false;
                    // }

                    const parsedValue = parsedData.value;

                    const formGroupControls = {};
                    for (const field of this.formFields) {
                        if (parsedValue.hasOwnProperty(field.fld_FieldName)) {
                            let value = parsedValue[field.fld_FieldName];

                            if (value === 'true') {
                                value = true;
                            }
                            if(field.fld_FieldName == 'fld_phoneno'){
                                if(this.newVariableFalseTrueCheck){
                                    value =   value;
                                }else{

                                    value =   this.formatPhoneNumber(value);
                                }

                            }

                            this.customForm.get(field.fld_FieldName).setValue(value);
                            
                        }
                    }
                    this.phoneData = parsedValue;
                }
                else {

                    for (const field of this.formFields) {
                        if (field.name == "PhoneNo" || field.name == 'fld_phoneno' || field.name == 'Phone No') {
                            // debugger;
                            let value = sessionStorage.getItem('phnno');
                            if(this.newVariableFalseTrueCheck){
                                value =   value;

                            }else{

                                value =   this.formatPhoneNumber(value);
                            }
                            this.customForm.get(field.fld_FieldName).setValue(value);
                        }
                    }
                }
            });
    }
    catch (error) {
    }   
    }

    formatPhoneNumber(phoneNumber: any): any {
      const visibleDigits = 3;
      const visiblePart = phoneNumber.substring(phoneNumber.length - visibleDigits);
      const hiddenPart = '*'.repeat(phoneNumber.length - visibleDigits);
      return hiddenPart + visiblePart;
    }

    // new ticket creation details all
    newTicket(val) {
      this.myValueDetails =  val
      this.getDynamicFormFields();
        this.newTicketFlag = true;
        let ticketId = 0;
        this.ticketFields = [];
        let formatedDate = new Date();
        this.showDynaTicketCard = false;
        this.ticketStartTimeUpdate = this.datePipe.transform(formatedDate, 'yyyy-MM-dd HH:mm:ss.S');
        if (this.showTicketCard == false) {
          this.showSaveButton = true;
          this.showUpdateButton = false;
          this.disabledTicketFields = false;
          this.getTicketTypeData();
          this.tree = "";
          this.ticketNo = 0;
          this.actionNo = 0;
          this.ticketCampaignName = sessionStorage.getItem('campName');
          this.selectedAssignedBy = sessionStorage.getItem('agentId');
          this.showTicketCard = true;
        }
        else {
          this.showSaveButton = true;
          this.showUpdateButton = false;
          this.disabledTicketFields = false;
          this.selectedticketStatus = 0;
          this.getTicketStatus();
          this.agentRemarks = "";
          this.getTicketTypeData();
          this.tree = "";
          this.ticketNo = 0;
          this.actionNo = 0;
        }
      }
      newHistoryVariable:boolean = false
      ticketHistoryNew(value){
        this.newHistoryVariable = true
        let ticketData = {
          ticketid: value.fld_ticketid,
          campid: this.loginData.value[0].campid,
          // custid: this.phoneid
        }

        this.getTicketInformation(ticketData);
        this.ticketHistoryDialog = true
      this.getDynamicFormFields();
      }
      async getTicketInformation(ticketData) {
        const res = await this.InstagramService.getTicketInfo(JSON.stringify(ticketData)).toPromise();
        if (res.status == "Success") {
            this.showTicketCard = true;
            this.showSaveButton = false;
            this.showUpdateButton = true;
            this.disabledTicketFields = true;
            this.ticketRecordsValueComman = res.ticketRecords
            if(this.newHistoryVariable){
this.noOfTables = this.ticketRecordsValueComman
            }
            if (res.ticketRecords.length != 0) {
                this.ticketRecords = res.ticketRecords[0];
                
    
                // voice file
                this.voicefile = res.ticketRecords[0].voicefile;
                
    
                this.ticketNo = this.ticketRecords.ticketID;
                // if (sessionStorage.getItem('extn_set') == 'Idle' && this.ticketRecords.sourceName == 'Voice') {
                //     this.sourceName = 'Offline';
                // }
                // else {
                //     this.sourceName = this.ticketRecords.sourceName;
                // }
    
                this.sourceName = this.ticketRecords.sourceName;
                this.ticketCampaignName = this.ticketRecords.campName;
                this.actionNo = this.ticketRecords.action_No;
                this.ticketTime = this.ticketRecords.ticket_Time;
                this.ticketDuration = this.ticketRecords.ticketTime;
                this.selectedAssignedBy = this.ticketRecords.assignedByID;
                this.selectedticketStatus = this.ticketRecords.ticket_statusID;
                this.getTicketStatus();
                this.agentRemarks = this.ticketRecords.remarks;
                this.ticketTypeDropdownData[0] = this.ticketRecords.listTicketTypes; // for multi level dropdown
                
                this.selectedTicketType[0] = this.ticketRecords.ticket_TypeID; // for multi level dropdown
                
    
    
                this.ticketID = this.ticketRecords.ticketID; // by rajat
    
                let data = res.objticketDynaField;
                
    
                if (data.length != 0 && Object.keys(data).length !== 0) {
    
                    this.showDynaTicketCard = true;
                    this.ticketFields = Object.values(data);
                    let ticketFields = this.ticketFields;
    
                    this.ticketFields = ticketFields.sort((a, b) => a.reportDisplaySeqNo - b.reportDisplaySeqNo);
                    
    
    
                    this.showDynaTicketCard = true;
                    let formGroupControls = {};
                    for (let field of this.ticketFields) {
                        formGroupControls[field.fld_FieldName] = [field.value || ''];
                        if (field.value == 'MultiCheckBox') {
                            formGroupControls[field.fld_FieldName] = [[]];
                        }
                    }
                    this.ticketForm = this.fb.group(formGroupControls);
    
    
                    let parsedData = res.ticketdynafieldvalues;
    
                    let formGroupControls1 = {};
                    for (let field of this.ticketFields) {
                        if (parsedData.hasOwnProperty(field.fld_FieldName)) {
                            let value = parsedData[field.fld_FieldName];
                            if (value === 'true') {
                                this.ticketForm.get(field.fld_FieldName).setValue(true);
                            }
                            else if (field.name == 'MultiCheckBox') {
                                this.abc = value;
                            }
                            else {
                                this.ticketForm.get(field.fld_FieldName).setValue(value);
                            }
                        }
                    }
                }
                else {
                    this.showDynaTicketCard = false;
                }
            }
        }
        else {
            this.showTicketCard = false;
            this.showUpdateButton = false;
            this.showSaveButton = true;
        }
    }
    
      getTicketTypeData() {
        this.InstagramService.getTicketType(this.loginData.value[0].campid).subscribe((res: any) => {
          this.ticketTypeDropdownData[0] = res;
          this.cdr.detectChanges();
        })
      }
    
      getTicketStatus() {
        let data = {};
        this.InstagramService.getTicketStatus(data).subscribe((res: any) => {
          this.ticketStatusDropdownData = res;
          this.cdr.detectChanges();
        })
      }
      updatedTicketType: any;
      updatedticketTypeDropdownData: any;
      ticketTypeDropdown(i: number) {
        let DynaTicketData;
        const campID = this.loginData.value[0].campid;
        const ticketTypeID = this.selectedTicketType[i];
        this.updatedTicketType = this.selectedTicketType[i]; // added this to get updated dropdown for dispid
    
    
        for (let j = i + 1; j < this.arrObj.length; j++) {
          this.ticketTypeDropdownData[j] = [];
        }
        this.arrObj.splice(i + 1);
    
        if (ticketTypeID) {
          this.InstagramService.getNextTicketType(campID, ticketTypeID).subscribe((res: any) => {
    
            this.tree = res.tree;
            if (res.listTicketTypes != 'No Record Found') {
              this.arrObj.push(res.listTicketTypes[0]);
              this.ticketTypeDropdownData[i + 1] = res.listTicketTypes;
              this.updatedticketTypeDropdownData = res.listTicketTypes; // added this to get updated dropdown for dispid
            }
            this.InstagramService.getDynaTicket(JSON.stringify(DynaTicketData = { campid: campID, ticketTypeID: ticketTypeID })).subscribe((res: any) => {
              let data = res['value'];
              if (res.status != 'failure') {
                this.showDynaTicketCard = true;
                this.ticketFields = Object.values(data);
                this.ticketFields = this.ticketFields.sort((a, b) => a.reportDisplaySeqNo - b.reportDisplaySeqNo);
                const formGroupControls = {};
                for (const field of this.ticketFields) {
                  formGroupControls[field.fld_FieldName] = [field.value || ''];
                }
                this.ticketForm = this.fb.group(formGroupControls);
              } else {
                this.showDynaTicketCard = false;
              }
            });
          });
        } else {
    
        }
      }
      callHistory() {
        this.historyDialogBox = true;
        this.InstagramService.getTicketHistoryData(this.loginData.value[0].campid, this.ticketNo).subscribe((res: any) => {
          this.ticketTypeHistory = Object.values(res.value);
        });
      }
    
      ticketTypeIDdd: any;
      saveTicketData(phoneid) {
        let callRecording = sessionStorage.getItem('callRecording')
        this.callID = sessionStorage.getItem('callID')
        let dynaticketfieldsValues: any;
        if (this.ticketForm.value.hasOwnProperty('undefined')) {
          dynaticketfieldsValues = {};
        }
        else {
          dynaticketfieldsValues = this.ticketForm.value;
        }
        if (sessionStorage.getItem('extn_set') == 'Idle' && this.ticketRecords.sourceName == 'Voice') {
          this.ticketRecords.source_Type = 7;
        }
        else {
          this.ticketRecords.source_Type = 9;
        }
    
        if (this.updatedTicketType) {
          this.ticketTypeIDdd = this.updatedTicketType;
        } else {
          this.ticketTypeIDdd = this.selectedTicketType[0];
        }
    
        let saveData = {
          phoneID: phoneid,
          ticketStartTime: this.ticketStartTimeUpdate,
          source_Type: this.ticketRecords.source_Type,
          source_ID: (this.myValueDetails && this.myValueDetails.id)  ? this.myValueDetails.id : this.ticketValue.source_ID,
          fld_Source_Value: (this.myValueDetails && this.myValueDetails.username) ?  this.myValueDetails.username : this.ticketValue.fld_Source_Value,
          // source_ID: this.accountDropdown[0].label,
          // fld_Source_Value: this.ticketRecords.fld_Source_Value,
          // call_Time: this.ticketRecords.call_Time,
          ticket_closureID: this.ticketRecords.ticket_closureID,
          loginUserID: this.agentid,
          userType: 3,
          campID: this.loginData.value[0].campid,
          ticketID: this.ticketNo,
          sourceName: "Instagram",
          campName: this.ticketCampaignName,
          action_No: this.actionNo,
          ticket_Time: this.ticketTime,
          ticketTime: this.ticketDuration,
          assignedByID: this.selectedAssignedBy,
          ticket_statusID: this.selectedticketStatus,
          remarks: this.agentRemarks,
          ticket_TypeID: this.ticketTypeIDdd,
          refvalue:(this.myValueDetails && this.myValueDetails.rowid) ? this.myValueDetails.rowid : this.ticketValue.refvalue
          // dynaticketfieldsValues: dynaticketfieldsValues,
          // callInvokeID: this.callinvid,
          // csvoicefile: callRecording
        }
    
    
    
        // this.onUpdateForm((result) => {
        //     if (result === 'Success') {
        this.InstagramService.saveTicketData(JSON.stringify(saveData)).subscribe((res: any) => {
          this.ticketSaved = true;
          if (res.status == 'Success') {
            this.messageService.add({ summary: 'info', severity: 'info', detail: 'Your Tickets information saved successfully' });
            this.ticketNo = res.ticketID;
    
            // enabling disable button
            // this.disposeCall = false;
    
            let ticketData = {
              ticketid: this.ticketNo,
              campid: this.loginData.value[0].campid,
              // custid: this.phoneid
            }
    
            this.getTicketInformation(ticketData);
            this.InstagramService.getTicketHistoryData(this.loginData.value[0].campid, this.ticketNo).subscribe((res: any) => {
              this.ticketTypeHistory = res.value;
            })
            this.valueSaveTrue = true
            // this.saveDispositionForm()
            // this.saveDispositionFormWithoutTicketing()
    
    
          }
          else {
            this.messageService.add({ summary: 'info', severity: 'info', detail: res.value })
            this.valueSaveTrue = false
          }
        })
        //     }
        // });
      }
    
      onUpdateForm(callback) {
        let cb;
        let formattedDate: String;
        let fld_phoneno;
        if (this.selectedCallBack == true) {
          cb = 1;
          let date = new Date(this.date)
          const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
          };
          const formattedDateWithoutComma = new Intl.DateTimeFormat('en-US', options).format(date);
          formattedDate = formattedDateWithoutComma.replace(',', '');
        }
        else {
          cb = 0;
          formattedDate = "";
        }
        this.getDispositionId();
    
        if (this.phoneData) {
          fld_phoneno = this.phoneData.fld_phoneno
        }
        else {
          fld_phoneno = sessionStorage.getItem('phnno')
        }
        let payLoad = {
          "campid": this.loginData.value[0].campid,
          "mode": 2,
          // "phoneid": this.phoneid,
          "agentid": this.agentid,
          "fld_phoneno": fld_phoneno,
          "dispid": this.dispositionID,
          "cb": this.selectedCallBack,
          "cbtime": formattedDate,
          "cbassignedto": this.selectedAssignedTo,
          "ticketTypeId": this.selectedTicketType[0],
          // "ticketID": ticketID
        }
    
        const newObj = { ...payLoad };
        // const newObj = { ...payLoad, ...this.customForm.value };
        this.InstagramService.getLeadCustField(newObj).subscribe(
          (data: any) => {
            this.phoneData = data;
    
            let parsedData = JSON.parse(data.value);
    
            if (parsedData.status == 'success') {
              callback('Success');
            }
    
          }, (err: any) => {
    
          });
      }
      getDispositionId() {
        // original code
        // let selectedTicketType = this.ticketTypeDropdownData.find((element: any) => element.value == this.selectedTicketType[0]);
        // this.dispositionID = selectedTicketType.description;
    
        // modified code
        if (this.updatedticketTypeDropdownData) { // case of new ticket
          this.updatedticketTypeDropdownData.forEach((element: any) => {
            if (element.value == this.updatedTicketType) {
              // if (element.value == this.selectedTicketType[0]) {
    
              this.dispositionID = element.description;
    
    
            }
          });
        } else { // case of existing ticket
    
    
          let selectedTicketType = this.ticketTypeDropdownData[0].find((element: any) => element.value == this.selectedTicketType[0]);
    
          this.dispositionID = selectedTicketType.description;
    
        }
      }
    
      updateTiecket() {
        let formatedDate = new Date();
        this.ticketStartTimeUpdate = this.datePipe.transform(formatedDate, 'yyyy-MM-dd HH:mm:ss.S');
        this.showSaveButton = true;
        this.showUpdateButton = false;
        this.disabledTicketFields = false;
        this.valueSaveTrue = false
      }
    
    
      closeDetailsTicket() {
        this.newTicketFlag = false
      }
      saveDynamicLeadCustField() {
        this.disposeCall = true;
        let cb;
        let newObj;
        let disposenlogout;
        let formattedDate: string;
        if (this.selectedCallBack == true) {
            cb = 1;
            if (!this.date) {
                this.disposeCall = false;
                this.messageService.add({ severity: 'info', summary: 'info', detail: 'Please Select Date' })
            }
            else {
                this.disposeCall = true;
                let date = new Date(this.date)
                const options: Intl.DateTimeFormatOptions = {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: true
                };
    
                const formattedDateWithoutComma = new Intl.DateTimeFormat('en-US', options).format(date);
                formattedDate = formattedDateWithoutComma.replace(',', '');
            }
        }
        else {
            cb = 0;
            formattedDate = "";
        }
        if (this.selectedDisposeCall == 1) {
            disposenlogout = 1;
        }
        else {
            disposenlogout = 0;
        }
    
        let mode=sessionStorage.getItem('latestDialMode');
    
        if(this.selectedDisposeCall==2  ){
         sessionStorage.setItem('redialFunctionality','true');
        }
        else 
        {
        sessionStorage.setItem('redialFunctionality','false');
        }
        
        let payLoad = {
            "campid":this.loginData.value[0].campid,
            "phoneid": 0,
            "mode": mode,
            "agentid": this.agentid,
            // "fld_phoneno":'undefined',
            "dispid": this.dispositionID,
            "dispremarks": this.solutionValue,
            "custremarks": this.feedbackValue,
            "otherremarks": this.remarksValue,
            "cb": this.selectedCallBack,
            "cbtime": formattedDate,
            "cbassignedto": this.selectedAssignedBy,
            "disposenlogout": disposenlogout,
            "date": this.date,
        }
        sessionStorage.setItem('disposenlogout', disposenlogout)
        // const newObj = { ...payLoad, ...this.customForm.value };
        // newObj.fld_fieldtext3 = this.schoolCodeValue
        // newObj.fld_fieldtext4 = this.schoolNameValue
        // newObj.fld_fieldtext5 = this.districtValue
        // newObj.fld_fieldtext6 = this.blockNameValue
        if(!this.newVariableFalseTrueCheck){
            newObj = { ...payLoad, ...this.customForm.value };
           newObj.fld_fieldtext3 = this.schoolCodeValue ? this.schoolCodeValue :newObj.fld_fieldtext3
           newObj.fld_fieldtext4 = this.schoolNameValue ? this.schoolNameValue : newObj.fld_fieldtext4
           newObj.fld_fieldtext5 = this.districtValue ? this.districtValue :newObj.fld_fieldtext5
           newObj.fld_fieldtext6 = this.blockNameValue ? this.blockNameValue : newObj.fld_fieldtext6
           newObj.fld_fieldtext8 = this.problemReportedValue ? this.problemReportedValue : newObj.fld_fieldtext8
          }else{
            newObj = { ...payLoad, ...this.customForm.value };
    
          }
        
        if(!newObj.fld_phoneno){
            return    this.messageService.add({ summary: 'info', severity: 'info', detail: 'Please Enter Phone Number.' }) 
        }
        this.InstagramService.getLeadCustField(newObj).subscribe(
            (data) => {
             if(data){
                this.phoneData = data;
                let phonedata = JSON.parse(this.phoneData.value)
                if (phonedata && phonedata.status == 'success') {
    
                    sessionStorage.setItem('redialPayload',JSON.stringify(payLoad))
                    // this.customService.disposeCallApiwithoutTicket(payLoad);
                    sessionStorage.setItem('phoneID', phonedata.phoneid); // added for incoming.
    
                    this.saveTicketData(phonedata.phoneid)
                }
              //   else{
              //     let id = '0'
              //     this.saveTicketData(id)
              // }
             }
                else {
                    this.disposeCall = false;
                    this.messageService.add({ severity: 'info', summary: 'Warning', detail: 'call not disposed' })
                }
            }, (err: any) => {
    
            });
        // }
    }
    ticketOpen(value){
      this.getDynamicFormFields();
      this.ticketValue = value
      if(this.ticketValue.ticketID !=0){
        this.getUdatedDialogData =true
        // this.newTicketValueOPenT = true
        // let ticketData = {
        //   ticketid: this.ticketValue.ticketid,
        //   campid: this.campid,
        //   // custid: this.phoneid
        // }
        let ticketd = this.ticketValue.ticketID ? this.ticketValue.ticketID : this.ticketValue.ticketID
        // // this.getTicketInformation(ticketData);
        
      //   let ticketData = {
      //     ticketid: ticketd,
      //     campid: this.campid,
      //     // custid: this.phoneid
      // }

      // this.getTicketInformation(ticketData);
          this.InstagramService.getTicketHistoryData(this.loginData.value[0].campid, ticketd).subscribe((res: any) => {
              this.ticketTypeHistory = res.value;
          this.showTicketCard = true;
          this.showSaveButton = false;
          this.showUpdateButton = true;
          this.disabledTicketFields = true;
          this.getTicketStatus();
          this.getTicketTypeData();
          if(this.ticketTypeHistory){
            this.ticketRecords = res.value[0];
            // voice file

            this.phoneid = (this.ticketRecords && this.ticketRecords.phoneID) ? this.ticketRecords.phoneID :  this.ticketValue.phoneID
            this.ticketNo = this.ticketValue.ticketid ? this.ticketValue.ticketid : this.ticketValue.ticketID;
            this.sourceName = (this.ticketRecords && this.ticketRecords.sourceName) ? this.ticketRecords.sourceName : this.ticketValue.sourceName,
          //   this.source_Type =  this.ticketRecords.source_Type,
            this.ticketCampaignName = (this.ticketRecords && this.ticketRecords.campName) ? this.ticketRecords.campName : this.ticketValue.campName;
            this.actionNo = this.ticketRecords.action_No ? this.ticketRecords.action_No : this.ticketValue.action_No;
            this.ticketTime = this.ticketRecords.ticket_Time ? this.ticketRecords.ticket_Time : this.ticketValue.ticket_Time;
            this.ticketDuration = this.ticketRecords.ticketTime ? this.ticketRecords.ticketTime : this.ticketValue.ticketTime;
            this.selectedAssignedBy = this.ticketRecords.assignedByID ? this.ticketRecords.assignedByID : this.ticketValue.assignedByID;
            this.selectedticketStatus = this.ticketRecords.ticket_statusID ? this.ticketRecords.ticket_statusID : this.ticketValue.ticket_statusID;
           
            this.agentRemarks = this.ticketRecords.remarks ? this.ticketRecords.remarks :this.ticketValue.remarks;
            this.ticketTypeDropdownData[0] = this.ticketRecords.listTicketTypes ?  this.ticketRecords.listTicketTypes : this.ticketValue.listTicketTypes; // for multi level dropdown
            // 
            this.selectedTicketType[0] = this.ticketRecords.ticket_TypeID ? this.ticketRecords.ticket_TypeID : this.ticketValue.ticket_TypeID; // for multi level dropdown
            
            this.ticketID = this.ticketValue.ticketid ? this.ticketValue.ticketid : this.ticketValue.ticketID; // by rajat
            if(this.phoneid){
            this.getDynamicLeadCustField();
            }
            this.voicefile = (res.value[0] && res.value[0].voicefile) ? res.value[0].voicefile :this.ticketValue.voicefile;
          }
          });
          
        }else{
      this.newTicketFlag = true;
        let ticketId = 0;
        this.ticketFields = [];
        let formatedDate = new Date();
        this.showDynaTicketCard = false;
        this.ticketStartTimeUpdate = this.datePipe.transform(formatedDate, 'yyyy-MM-dd HH:mm:ss.S');
        if (this.showTicketCard == false) {
            this.showSaveButton = true;
            this.showUpdateButton = false;
            this.disabledTicketFields = false;
            this.getTicketTypeData();
            this.tree = "";
            this.ticketNo = 0;
            this.actionNo = 0;
            this.ticketCampaignName = sessionStorage.getItem('campName');
            this.selectedAssignedBy = sessionStorage.getItem('agentId');
            this.showTicketCard = true;
        }
        else {
            this.showSaveButton = true;
            this.showUpdateButton = false;
            this.disabledTicketFields = false;
            this.selectedticketStatus = 0;
            this.getTicketStatus();
            this.agentRemarks = "";
            this.getTicketTypeData();
            this.tree = "";
            this.ticketNo = 0;
            this.actionNo = 0;
        }
      }
    }
}

