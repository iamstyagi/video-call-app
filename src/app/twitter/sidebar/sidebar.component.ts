import { Component, NgZone, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  selectedIndex: number | null = null;
  constructor(private router: Router, private zone: NgZone) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateSelectedIndex(event.url);
      }
    });

    this.setSelectedIndex(2);
   }

  ngOnInit(): void {
  }

  items: any[] = [
    { label: 'New', icon: 'pi pi-inbox', routerLink: 'iCallMate-cCP/twitter/tweet' },
    { label: 'Queue', icon: 'pi pi-arrows-h', routerLink: 'iCallMate-cCP/twitter/queue' },
    { label: 'Inbox', icon: 'pi pi-envelope', routerLink: 'iCallMate-cCP/twitter/inbox' },
    { label: 'Outbox', icon: 'pi pi-envelope', routerLink: 'iCallMate-cCP/twitter/outbox' },
    { label: 'Sent', icon: 'pi pi-envelope', routerLink: 'iCallMate-cCP/twitter/sent' },

  ];


  updateSelectedIndex(url: string) {
    const selectedItem = this.items.find(item => url.includes(item.routerLink));
    if (selectedItem) {
      const selectedIndex = this.items.indexOf(selectedItem);
      this.setSelectedIndex(selectedIndex);
    }
  }
  

  navigate(item: any) {
    if (item.routerLink) {
      this.router.navigate([item.routerLink]);
      this.updateSelectedIndex(item.routerLink);
    }
  }

  setSelectedIndex(index: number) {
    this.zone.run(() => {
        this.selectedIndex = index;
    });
}

}
