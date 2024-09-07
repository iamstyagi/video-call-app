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

    this.setSelectedIndex(1);
  }

  ngOnInit(): void {
  //  let item =  { label: 'New Post', icon: 'pi pi-inbox', routerLink: 'iCallMate-cCP/facebook/new-post' }
  let item = { label: 'My Posts', icon: 'pi pi-envelope', routerLink: 'iCallMate-cCP/facebook/inbox-post' }
  this.navigate(item);
}

  items: any[] = [
    { label: 'New Post', icon: 'pi pi-inbox', routerLink: 'iCallMate-cCP/facebook/new-post' },
    // { label: 'Queue', icon: 'pi pi-envelope', routerLink: 'iCallMate-cCP/facebook/queue-post' },
    { label: 'My Posts', icon: 'pi pi-envelope', routerLink: 'iCallMate-cCP/facebook/inbox-post' },
    // { label: 'Outbox', icon: 'pi pi-envelope', routerLink: 'iCallMate-cCP/facebook/outbox-post' },
    // { label: 'Sent', icon: 'pi pi-envelope', routerLink: 'iCallMate-cCP/facebook/sent-post' },
    { label: 'Deleted Posts', icon: 'pi pi-envelope', routerLink: 'iCallMate-cCP/facebook/deleted-post' },

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
