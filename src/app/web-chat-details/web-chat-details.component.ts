import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatService } from '../chat/service/chat.service';
import { SharedService } from '../demo/service/shared.service';
import { WebChatService } from './web-chat-service/web-chat.service';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-web-chat-details',
  templateUrl: './web-chat-details.component.html',
  styleUrls: ['./web-chat-details.component.scss']
})
export class WebChatDetailsComponent implements OnInit {

  subscription: Subscription;
  customerInfo:boolean=false

  activeUser: any;
  checkVariable:boolean = false
sideBarMange:boolean = true
  
// constructor(){}
nofificationDetailsArray:any[] = []
  campIdDetails: any;
  phoneNumber: any;
  array:any = [];
  formData:any
  loginData:any
  campid:any
  agentID:any
  // currentDateTime = new Date().toISOString();
  // formattedDateTime = this.currentDateTime.replace('Z', '');
constructor(private route: ActivatedRoute,private service: WebChatService,private messageService:MessageService) {
  this.service.connectSocket()
  // this.route.queryParams.subscribe(
  //   params => {
  //     this.campIdDetails =  params['campId'];
  //     this.phoneNumber =  params['PhoneNo'];
  //   }
  // )
  this.loginData = JSON.parse((localStorage.getItem("loginData")));
  this.campid = this.loginData.value[0].campid;
  this.agentID = this.loginData.value[0].agentID;
 }
searchValue:any
nofitifcationData:any
noticount:any
sendValueTochild:any

  ngOnInit(): void {
    this.getCustomerDetails()
  this.service.receiveMessageCustomerDetails().subscribe((data) => {
    if(data){
      this.getCustomerDetails()
      if(data.message){

        this.service.sendMessage(data,'chatting')
      }
    }
    this.noticount = data.notificationCount
    
   
    if (!this.nofificationDetailsArray.some(item => item.phoneNo === data.phoneNo)) {
        this.nofificationDetailsArray.push(data);
    
    }else{
    this.nofificationDetailsArray = []

    }
    localStorage.setItem('notificationCOunt',this.noticount)
    


   });
  
  //  this.service.receiveMessageCustomerDetailsNew().subscribe((data) => {
  //   if( data.message == 'HELLO'){
  //   setTimeout(() => {
  //     this.getCustomerDetails()
  //   }, 5000);
  //   }
  //   this.noticount = data.notificationCount
  // });
  //  setTimeout(() => {
  //   this.sendNotificatuionData()
  //  }, 1000);
  }
   val:boolean
  sendDataToChild(value){
    this.checkVariable = true
this.sendValueTochild = value
  //  if(this.agentID){
    this.val=true;
    let data ={
      agentId :  this.agentID,
      "phoneNo":this.sendValueTochild.phoneNo
    }
// setTimeout(() => {
  this.service.sendMessage(data,'chatHistory')
  let newData = {
    // htCustFormFilterFields :valueCheck,
    campaignId : this.campid,
    "phoneNo":this.sendValueTochild.phoneNo,
    "agentId": this.agentID,
      }
      this.service.sendMessage(newData,'messageseen')
      // localStorage.setItem('notificationCOunt',this.noticount)
// }, 1000);
  //  }
setTimeout(() => {
  this.getCustomerDetails()
}, 1000);
  }
  sendNotificatuionData(){
    let data = {
      // htCustFormFilterFields :valueCheck,
      campaignId : this.campid,
      "phoneNo": '',
      // "phoneNo": phoneNumberDetails,
      "agentId": this.agentID,
      "type": "AGENT",
      // sendDateTimeStr :this.formattedDateTime

    }
    this.service.sendMessage(JSON.stringify(data),'notification')
  }
  getCustomerDetails(){
    let data = {
      "agentId":this.agentID,
      "campaignId":this.campid
    }
    this.service.getCustomerNoDetails(data).subscribe((res)=>{
      if(res['data']){
        this.nofificationDetailsArray = res['data']

      }else{
    this.nofificationDetailsArray = []

      }
    })
  }


  customerInfoDialog(data){
    this.formData = data['htCustFormFilterFields']
    this.array = [];
    for (let val of Object.values(this.formData)) {
      this.array.push(val);
    }
    this.customerInfo=true
  
  }



  activeTabIndex: number = -1; // Initialize active tab index to -1, indicating no active tab

  activateTab(index: number) {
      this.activeTabIndex = index; // Set the clicked tab index as active
  }


  checkDynamicdataNew:any
  newSubmittedArry:any = []
  sendToChat(){
  let valueCheck =   this.formData 
  for (let fieldName in valueCheck) {
    let field = valueCheck[fieldName];
        this.checkDynamicdataNew = field.required
      let valuesNew= field.value
        if(this.checkDynamicdataNew == true && valuesNew == ''){
          this.messageService.add({ severity: 'warn', summary: 'warn', detail: 'Please fill all required field first!' });
          return 
          // return this.toastr.error('Error', 'Please fill all required field first!');
        
        }
  }
  // Filter out the object with fld_FieldName equal to "Fld_PhoneNo"
// Filter out the object with fld_FieldName equal to "Fld_PhoneNo"
const filteredObject = Object.values(valueCheck).find(obj => obj['fld_FieldName'] === "Fld_PhoneNo");
let phoneNumberDetails = filteredObject['value']
let sendD ={}
// Additional keys and their values
const additionalData = {
  "campaignId": "1",
  "phoneNo": phoneNumberDetails,
  // "agentId": "",
  // "type": "CUSTOMER"
};
// Iterate over each property in the object
for (const key in valueCheck) {
  if (valueCheck.hasOwnProperty(key)) {
      // Get the name and value attributes of each property
      const { name, value } = valueCheck[key];
      // Push the name and value to the array
      sendD[name] = value;
            this.newSubmittedArry.push({ name, value });
  }
}
// Merge the additional data with the existing object
Object.assign(sendD, additionalData);
let data 
 data = {
  htCustFormFilterFields :valueCheck,
  campaignId : '1',
  "phoneNo": phoneNumberDetails,
  // "agentId": "",
  // "type": "AGENT"
}
  
  this.service.saveCustomerFieldValue(data).subscribe((res)=>{
    if(res){
      this.messageService.add({ severity: res.status, summary: res.status, detail: res.message });
      this.customerInfo = false
      this.getCustomerDetails()
  }
    
  })
  
   
  }
  newFunction(value){
    if(value == true || value == false){
      this.sideBarMange = value
    }else{
      // if(value){
        this.nofificationDetailsArray =value
        // }else{
        //   this.nofificationDetailsArray = []
        // }
    }

  }

  onSelectTimeOnly(value){
    
  }
  onSelectSystemDate(value){
    

  }
  onSelectSystemDateTime(value){
    

  }
  onSelectDateTime(value){
    

  }
  onSelectDateOnly(value: Date, field: any) {
    const formattedDate = this.formatDate(value);
    // Update the field's value
    field.value = formattedDate;
}

// Helper method to format the date
formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
}
getAvatarStyle(phoneNumber: string): any {

  const startingDigits = phoneNumber.substring(3, 4); // Extract the first three digits
  let backgroundColor: string;
  let borderClr: string;
  switch (startingDigits) {
    case '1':
      backgroundColor = '#FF5733'; // Example color for starting digit 1
      borderClr = '#FF5733'; // Example color for starting digit 1
      break;
    case '2':
      backgroundColor = '#29a63f'; // Example color for starting digit 2
      borderClr = '#29a63f'; // Example color for starting digit 2
      break;
    case '3':
      backgroundColor = '#3357FF'; // Example color for starting digit 3
      borderClr = '#3357FF'; // Example color for starting digit 3
      break;
    case '4':
      backgroundColor = '#F1C40F'; // Example color for starting digit 4
      borderClr = '#F1C40F'; // Example color for starting digit 4
      break;
    case '5':
      backgroundColor = '#8E44AD'; // Example color for starting digit 5
      borderClr = '#8E44AD'; // Example color for starting digit 5
      break;
    case '6':
      backgroundColor = '#f40c9a'; // Example color for starting digit 6
      borderClr = '#f40c9a'; // Example color for starting digit 6
      break;
    case '7':
      backgroundColor = '#1F8DD6'; // Example color for starting digit 7
      borderClr = '#1F8DD6'; // Example color for starting digit 7
      break;
    case '8':
      backgroundColor = '#16A085'; // Example color for starting digit 8
      borderClr = '#16A085'; // Example color for starting digit 8
      break;
    case '9':
      backgroundColor = '#E74C3C'; // Example color for starting digit 9
      borderClr = '#E74C3C'; // Example color for starting digit 9
      break;
    default:
      backgroundColor = '#e90a13'; // Default color
      borderClr = '#e90a13'; // Default color
  }

  return {
    'background-color': backgroundColor,
    'border-color':borderClr,
    // 'border-radius': '50%', // Makes the avatar round
    'width': '20px',
    'height': '20px',
    // 'display': 'flex',
    // 'align-items': 'center',
    // 'justify-content': 'center',
    'color': '#fff', // Text color
    'font-weight': 'bold',
    'text-transform': 'uppercase', // Optional: transform text to uppercase
    'font-size': '10px', // Adjust font size as needed
    'padding-left': '4px'

  };
}
}
