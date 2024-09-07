import { Injectable } from '@angular/core';
import { Subject, Observable, throwError } from "rxjs";
import { Message } from "primeng/api";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";
import { environment } from '../../../environments/environment';

@Injectable()
export class MenuService {

    private menuSource = new Subject<string>();
    private resetSource = new Subject();

    menuSource$ = this.menuSource.asObservable();
    resetSource$ = this.resetSource.asObservable();


    constructor(private http: HttpClient) { }
    headers = { 'content-type': 'application/json' }
    baseUrl = environment.apiUrl;

    // http://192.168.68.176:8090/icallmate-ccp-api-ccc/getprelogin

    public breaklist(breakListData: any) {
        return this.http.post<any>(this.baseUrl + '/breaklist', breakListData, { 'headers': this.headers });
    }


    public camptrfrlist(campListData: any) {
        return this.http.post<any>(this.baseUrl + '/camptrfrlist', campListData, { 'headers': this.headers });
    }

    public skillsetlist(skillListData: any) {
        return this.http.post<any>(this.baseUrl + '/skillsetlist', skillListData, { 'headers': this.headers });
    }

    public campagentparam(campagentParamData: any) {
        return this.http.post<any>(this.baseUrl + '/campagentparam', campagentParamData, { 'headers': this.headers });
    }

    public getagentaprdetails(agentAprDetails: any) {
        return this.http.post<any>(this.baseUrl + '/getagentaprdetails', agentAprDetails, { 'headers': this.headers });
    }

    public loadPreviewData(data:any){
        return this.http.post(this.baseUrl + '/loadPreviewData', data, { 'headers': this.headers });
    }

    public loadPreviewCallBackData(data:any){
        return this.http.post(this.baseUrl + '/loadPreviewCallBackData',data, { 'headers':this.headers });
    }


    onMenuStateChange(key: string) {
        this.menuSource.next(key);
    }

    reset() {
        this.resetSource.next();
    }
    
    public getPreviewSearchDisposition(data : any) {
        return this.http.post<any>(this.baseUrl + '/displistPrev' ,data, { 'headers':this.headers } );
      }
      public getPreviewSearchDiscard(params : any) {
        return this.http.post<any>(this.baseUrl + '/loadPerviewDiscard' ,params, { 'headers':this.headers } );
      }
       //-----------------------------------make call by phone ID------------------------------------//
    public makeCallByPhoneID(params: any,) {
        return this.http.post<any>(this.baseUrl + '/getPhoneNo' ,params, { 'headers':this.headers } );
    }
    // public makeCallByPhoneID(params:any) {
    //     let param = params
    //     return this.http.get<any>(this.baseUrl + '/makecallbyphoneid'+ '?phoneID='+param.id +'&campID=' +param.campID, { 'headers': this.headers });
    // }
}
