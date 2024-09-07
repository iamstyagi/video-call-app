import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, RouterEvent } from '@angular/router';
import { LoginService } from '../demo/service/login.service';
import { Router } from '@angular/router';
import { CustomService } from '../demo/service/custom.service';
import * as CryptoJS from 'crypto-js';
import '../../assets/work.js';
import '../../assets/crypto-js.js';
declare function encpass(password);
declare function dataEncrytp(password,byteArray1);
import { MessageService } from 'primeng/api';

import * as JsSIP from '../../assets/jssip-config/jssip'
import { MywebrtcDetailsService } from '../demo/service/mywebrtc-details.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService, MywebrtcDetailsService]
})

export class LoginComponent implements OnInit {
  Password: any;
  submitted: boolean;
  agentId: any;
  password: any;
  appversion: "1";
  serverIpFile = environment.workFileServerIp
  serverPortFile = environment.workFileServerPort
  serverWssorWs = environment.workFileServerwsWss
  CallState: any;
  Message: any;
   byteArray1 = [74, 110, 86, 57, 52, 53, 53, 112, 69, 107, 72, 105, 78, 68, 105, 65]; 
   ssidValue:any
   myPassword
   globalData:any
  constructor(
    private messageService: MessageService,
    private loginService: LoginService,
    private _route: Router,
    private routerA :ActivatedRoute,
    private customService: CustomService,
    private mywebrtcdetailsService: MywebrtcDetailsService) {
      sessionStorage.clear();
      localStorage.clear()  
      this.routerA.queryParams.subscribe((res:any)=>{
        if(res && res.ssid){
          this.ssidValue = encodeURIComponent(res.ssid)
          if(this.ssidValue){
            this.getEncryption(this.ssidValue)
          }
        }
      })

  }

  ngOnInit(): void {
    sessionStorage.clear();
    localStorage.clear();
    sessionStorage.removeItem("getDynamicFormFieldsCache");
  }

  encryPasswd() {
      sessionStorage.setItem('userPass', this.password)
 let pass =this.loginService.dataEncrytpNew(this.password,this.byteArray1)
 if(pass){
//  setTimeout(() => {
  this.login(pass)
//  }, 1000);
 }
  }
  login(pass) {
    this.submitted = true;
    let payLoad = {
      "agentid": this.agentId,
      "password": pass,
      "appversion": this.appversion
    }
    sessionStorage.setItem('userId', this.agentId)
    sessionStorage.setItem('serverIpFile',this.serverIpFile)
    sessionStorage.setItem('serverPortFile',this.serverPortFile)
    sessionStorage.setItem('serverWssorWs',this.serverWssorWs)
    // localStorage.setItem("userDetails", btoa(JSON.stringify(payLoad)));
    this.customService.agentid = this.agentId;
    sessionStorage.setItem('agentid', this.agentId)


    this.loginService.getprelogin(payLoad).subscribe(
      (data: any) => {
        localStorage.setItem("loginData", (JSON.stringify(data)));
        if (data.status == 'success') {
    
          this.campsharedparam(data.value[0].campid)
          
          // if (data.value[0].enableWebAgentWSSL) {
          let enableWebAgentWSSLValue = data.value[0].enableWebAgentWSSL
          let enableWebAgentWSSL = 'ws'
          if (enableWebAgentWSSLValue) {
            enableWebAgentWSSL = 'wss'
            sessionStorage.setItem('enableWebAgentWSSL', enableWebAgentWSSL);
          } else {
            enableWebAgentWSSL = 'ws'
            sessionStorage.setItem('enableWebAgentWSSL', enableWebAgentWSSL);
          }
          sessionStorage.setItem('serverip', data.value[0].serverip);
          sessionStorage.setItem('serverportno', data.value[0].serverportno);


          // }


          this._route.navigate(['/iCallMate-cCP']);

        }
        else {
          this.messageService.add({ severity: 'warn', summary: data.status, detail: data.value[0].loginstatus });
        }
      });
  }

  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
  }

  campsharedparam(campid: any) {

    let data = {
      campid: campid
    }
    this.loginService.campsharedparam(data).subscribe((res: any) => {

      let crmurlpopupstate = res.value[0].crmurlpopupstate;
      let isallowtrfrcall = res.value[0].isallowtrfrcall;
      let ispreviewdial = res.value[0].ispreviewdial;

      localStorage.setItem('crmurlpopupstate', crmurlpopupstate);
      localStorage.setItem('isallowtrfrcall', isallowtrfrcall);
      localStorage.setItem('ispreviewdial', ispreviewdial);
sessionStorage.setItem('campSharedDataGet',JSON.stringify(res.value[0]))
sessionStorage.setItem('myNewArrayValueSession',res.value[0].biometricsuccessper)

      // for webrtc start
      if (res.value[0].isenablewebRTC) {
        this.servericeDetailsGet(campid)
        // this.mywebrtcdetailsService.initSipClient(this.localMedia, this.remoteAudio, this.agentId, this.myPassword)
      }
      // for webrtc end
    }, err => {

    })
  }




  getDetailsOfIp: any
  servericeDetailsGet(campid) {

    this.loginService.serverDetails(campid).subscribe((res) => {
      if (res.status == 'Success') {
        this.getDetailsOfIp = res.data[0]
        if (this.getDetailsOfIp) {
          sessionStorage.setItem('ceckDetailsValue', 'myWebRtcValue')
          sessionStorage.setItem('serverIpDeatilsNew', JSON.stringify(this.getDetailsOfIp))
          // this.MywebrtcDetailsService.initSipClient(this.localMedia,this.remoteAudio,this.newDetailsOfId,this.newDetailsOfpassword,this.getDetailsOfIp);
        }
      }
    })
  }
  getEncryption(ssid){
    this.loginService.getEncrytion(ssid).subscribe((data)=>{
if(data.value){
  this.globalData = data.value[0]
  sessionStorage.setItem('userPass', this.globalData.password)
  // this.campgainModal = this.globalData.campid
  this.agentId = this.globalData.agentID
  // sessionStorage.setItem('userPass', this.password)
  sessionStorage.setItem('userId', this.agentId)
  sessionStorage.setItem('serverIpFile',this.serverIpFile)
  sessionStorage.setItem('serverPortFile',this.serverPortFile)
  sessionStorage.setItem('serverWssorWs',this.serverWssorWs)
  // localStorage.setItem("userDetails", btoa(JSON.stringify(payLoad)));
  this.customService.agentid = this.agentId;
  sessionStorage.setItem('agentid', this.agentId)
  localStorage.setItem("loginData", (JSON.stringify(data)));

  if(this.globalData){
    // this.login(this.globalData.passWord)
  }
  if (data.status == 'success') {
    
    this.campsharedparam(data.value[0].campid)
    
    // if (data.value[0].enableWebAgentWSSL) {
    let enableWebAgentWSSLValue = data.value[0].enableWebAgentWSSL
    let enableWebAgentWSSL = 'ws'
    if (enableWebAgentWSSLValue) {
      enableWebAgentWSSL = 'wss'
      sessionStorage.setItem('enableWebAgentWSSL', enableWebAgentWSSL);
    } else {
      enableWebAgentWSSL = 'ws'
      sessionStorage.setItem('enableWebAgentWSSL', enableWebAgentWSSL);
    }
    sessionStorage.setItem('serverip', data.value[0].serverip);
    sessionStorage.setItem('serverportno', data.value[0].serverportno);


    // }


    this._route.navigate(['/iCallMate-cCP']);

  }
  else {
    this.messageService.add({ severity: 'warn', summary: data.status, detail: data.value[0].loginstatus });
  }
}
    })
  }

}

