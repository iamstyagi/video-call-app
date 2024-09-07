import { Component, NgZone, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

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
  }

  ngOnInit(): void {
  let item ={ label: 'My Posts', icon: 'pi pi-envelope', routerLink: 'iCallMate-cCP/instagram/insta-inbox' }
  // this.navigate(item);
  }
  


  items: any[] = [
    { label: 'New Post', icon: 'pi pi-inbox', routerLink: 'iCallMate-cCP/instagram/insta-post' },
    { label: 'My Posts', icon: 'pi pi-envelope', routerLink: 'iCallMate-cCP/instagram/insta-inbox' },
    { label: 'Deleted Posts', icon: 'pi pi-envelope', routerLink: 'iCallMate-cCP/instagram/insta-deleted' },
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
