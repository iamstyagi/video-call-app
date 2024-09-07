import {Component, OnInit} from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

    inputStyle = 'outlined';

    ripple: boolean;

    theme = 'indigo';

    layoutColor = 'white';

    colorScheme = 'light';

    menuMode = 'static';

    checkInspectDisableEnable:any = environment.enableInspectMode


    constructor(private primengConfig: PrimeNGConfig) {
    }

    ngOnInit() {
        this.primengConfig.ripple = true;
        this.ripple = true;
        if (this.checkInspectDisableEnable === '1') {
            // Enable inspect mode
            this.enableInspectMode();
          } else {
            // Disable inspect mode
            this.disableInspectMode();
          }
    }

    enableInspectMode() {
      }
    
      disableInspectMode() {
        this.preventInspectMode();
      }
    
      preventInspectMode() {
        // Disable right-click
        document.addEventListener('contextmenu', event => event.preventDefault());
    
        // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
        document.addEventListener('keydown', event => {
          if (
            event.keyCode === 123 || // F12
            (event.ctrlKey && event.shiftKey && event.keyCode === 73) || // Ctrl+Shift+I
            (event.ctrlKey && event.shiftKey && event.keyCode === 74) || // Ctrl+Shift+J
            (event.ctrlKey && event.keyCode === 85) // Ctrl+U
          ) {
            event.preventDefault();
          }
        });
      }
}
