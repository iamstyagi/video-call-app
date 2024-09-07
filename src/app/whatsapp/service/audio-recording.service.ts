import { Injectable } from "@angular/core";
import * as RecordRTC from "recordrtc";
import * as moment from 'moment';
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

interface RecordedAudioOutput {
  blob: Blob;
  title: string;
}

@Injectable()
export class AudioRecordingService {
  private stream;
  private recorder;
  private interval;
  private startTime;
  private _recorded = new Subject<RecordedAudioOutput>();
  private _recordingTime = new Subject<string>();
  private _recordingFailed = new Subject<string>();
  baseUrl = environment.apiUrl;
campID:any

private dataSubject = new BehaviorSubject<any>(null);
data$ = this.dataSubject.asObservable();
constructor(public http : HttpClient){}
  getRecordedBlob(): Observable<RecordedAudioOutput> {
    return this._recorded.asObservable();
  }

  getRecordedTime(): Observable<string> {
    return this._recordingTime.asObservable();
  }

  recordingFailed(): Observable<string> {
    return this._recordingFailed.asObservable();
  }

  startRecording(campid) {
    this.campID = campid
    if (this.recorder) {
      // It means recording is already started or it is already recording something
      return;
    }

    this._recordingTime.next("00:00");
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(s => {
        this.stream = s;
        this.record();
      })
      .catch(error => {
        this._recordingFailed.next();
      });
  }

  abortRecording() {
    this.stopMedia();
  }

  private record() {
    this.recorder = new RecordRTC.StereoAudioRecorder(this.stream, {
      type: "audio",
      mimeType: "audio/mp3"
    });

    this.recorder.record();
    this.startTime = moment();
    this.interval = setInterval(() => {
      const currentTime = moment();
      const diffTime = moment.duration(currentTime.diff(this.startTime));
      const time =
        this.toString(diffTime.minutes()) +
        ":" +
        this.toString(diffTime.seconds());
      this._recordingTime.next(time);
    }, 1000);
  }

  private toString(value) {
    let val = value;
    if (!value) val = "00";
    if (value < 10) val = "0" + value;
    return val;
  }

  stopRecording() {
    if (this.recorder) {
      this.recorder.stop(
        blob => {
          if (this.startTime) {
            const fileName = 'voiceMessage'; // Base name of the file
          const fileExtension = 'mp3'; // Desired file extension
          this.uploadAudio(blob, fileName, fileExtension); // Call method to upload audio blob to API
            const mp3Name = encodeURIComponent(
              "audio_" + new Date().getTime() + ".mp3"
            );
            this.stopMedia();
            this._recorded.next({ blob: blob, title: mp3Name });
          }
        },
        () => {
          this.stopMedia();
          this._recordingFailed.next();
        }
      );
    }
  }
  private uploadAudio(blob: Blob, fileName: string, fileExtension: string) {
    const formData = new FormData();
    const file = new File([blob], `${fileName}.${fileExtension}`, { type: `audio/${fileExtension}` });
    formData.append('file', file);
  
    this.http.post<any>(this.baseUrl + '/uploadFileWA'+'?campID='+this.campID, formData).subscribe(
      response => {
        if (response) {
          this.dataSubject.next(response)
        } else {
          this._recordingFailed.next('Invalid response from server');
        }
      },
      error => {
        this._recordingFailed.next('Error uploading audio');
      }
    );
    this.stopMedia();
  }
  

  private stopMedia() {
    if (this.recorder) {
      this.recorder = null;
      clearInterval(this.interval);
      this.startTime = null;
      if (this.stream) {
        this.stream.getAudioTracks().forEach(track => track.stop());
        this.stream = null;
      }
    }
  }
}
