import { Injectable } from '@angular/core';
import { Subject, Observable, throwError } from "rxjs";
import { Message } from "primeng/api";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";
import { environment } from '../../../environments/environment';
import * as CryptoJS from "crypto-js";



@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(private http: HttpClient) { }
    headers = { 'content-type': 'application/json' }
    baseUrl = environment.apiUrl;


    public getprelogin(agentLogin: any):Observable<any> {
        return this.http.post<any>(this.baseUrl + '/getprelogin', agentLogin, { 'headers': this.headers });
    }

    //-------------------check encryPassword in Backend------------------------------------//
    public checkEncPasswd(password:any):Observable<any>{
        return this.http.get<any>(this.baseUrl + '/getencryptedpasswrd' + '?password=' +password, {'headers': this.headers} );
    }enableWebAgentWSSL

    public campsharedparam(campid:any): Observable<any>{
        return this.http


.post<any>(this.baseUrl + '/campsharedparam', campid, { 'headers': this.headers })
    }

    public serverDetails(campid:any): Observable<any>{
        // return this.http.post<any>(this.baseUrl + '/serviceDetail', campid, { 'headers': this.headers })
    return this.http.get<any>(this.baseUrl + '/serviceDetail?' + 'campID=' + campid)

    }

    
 dataEncrytpNew(data,byteArray1){
    let keyHex = CryptoJS.enc.Hex.parse(byteArray1.map(byte => byte.toString(16).padStart(2, '0')).join(''));
    let encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(data), keyHex, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
// var encrypted1 = encrypted.toString();
    return encrypted.toString();
    // sessionStorage.setItem('encpass', encrypted1)

}
getEncrytion(data){
    return this.http.get<any>(this.baseUrl + '/dcryptSSIDJS' + '?ssid=' + data,{'headers': this.headers})
}
}