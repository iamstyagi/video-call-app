import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';
import {TopbarMenuService} from './demo/service/app.topbarmenu.service';
import {AppMainComponent} from './app.main.component';
import {AppComponent} from './app.component';

@Component({
    /* tslint:disable:component-selector */
    selector: '[app-topmenu]',
    /* tslint:enable:component-selector */
    template: `
        <ng-container>
            <a [attr.href]="item.url" (click)="itemClick($event)" *ngIf="!item.routerLink || item.items"
               (keydown.enter)="itemClick($event)" [attr.target]="item.target" [attr.tabindex]="0"
               [ngClass]="item.class" pRipple>
                <i [ngClass]="item.icon" class="layout-topbar-menuitem-icon"></i>
                <span class="layout-topbar-menuitem-text">{{item.label}}</span>
                <i class="pi pi-fw pi-angle-down layout-topbar-submenu-toggler" *ngIf="item.items"></i>
            </a>
            <a (click)="itemClick($event)" *ngIf="item.routerLink && !item.items"
               [routerLink]="item.routerLink" routerLinkActive="topbar-active-menuitem-routerlink"
               [routerLinkActiveOptions]="{exact: true}" [attr.target]="item.target" [attr.tabindex]="0"
               [ngClass]="item.class" pRipple>
                <i [ngClass]="item.icon" class="layout-topbar-menuitem-icon"></i>
                <span class="layout-topbar-menuitem-text">{{item.label}}</span>
                <i class="pi pi-fw pi-angle-down layout-topbar-submenu-toggler" *ngIf="item.items"></i>
            </a>
            <ul *ngIf="item.items && active" role="menu"
                [@children]="(root? 'visible' : active ? 'visibleAnimated' : 'hiddenAnimated')">
                <ng-template ngFor let-child let-i="index" [ngForOf]="item.items">
                    <li app-topmenu [item]="child" [index]="i" [parentKey]="key" [class]="child.badgeClass"></li>
                </ng-template>
            </ul>
        </ng-container>
    `,
    host: {
        '[class.topbar-active-menuitem]': '(active)'
    },
    animations: [
        trigger('children', [
            state('void', style({
                height: '0px'
            })),
            state('hiddenAnimated', style({
                height: '0px'
            })),
            state('visibleAnimated', style({
                height: '*'
            })),
            transition('visibleAnimated => hiddenAnimated', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('hiddenAnimated => visibleAnimated', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('void => visibleAnimated, visibleAnimated => void',
                animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ]
})
export class AppTopbarMenuComponent implements OnInit {

    @Input() item: any;

    @Input() index: number;

    @Input() root: boolean;

    @Input() parentKey: string;

    active = false;

    menuSourceSubscription: Subscription;

    menuResetSubscription: Subscription;

    key: string;

    constructor(public appMain: AppMainComponent, public app: AppComponent, public router: Router,
                private cd: ChangeDetectorRef, private topbarmenuService: TopbarMenuService) {
        this.menuSourceSubscription = this.topbarmenuService.menuSource$.subscribe(key => {
            // deactivate current active menu
            if (this.active && this.key !== key && key.indexOf(this.key) !== 0) {
                this.active = false;
            }
        });

        this.menuResetSubscription = this.topbarmenuService.resetSource$.subscribe(() => {
            this.active = false;
        });

        this.router.events.pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(params => {
                if (this.item.routerLink) {
                    this.updateActiveStateFromRoute();
                } else {
                    this.active = false;
                }
            });
    }

    ngOnInit() {
        if (this.item.routerLink) {
            this.updateActiveStateFromRoute();
        }

        this.key = this.parentKey ? this.parentKey + '-' + this.index : String(this.index);
    }

    updateActiveStateFromRoute() {
        this.active = this.router.isActive(this.item.routerLink[0], !this.item.items);
    }

    itemClick(event: Event) {
        // avoid processing disabled items
        if (this.item.disabled) {
            event.preventDefault();
            return;
        }

        // execute command
        if (this.item.command) {
            this.item.command({originalEvent: event, item: this.item});
        }
        this.topbarmenuService.onMenuStateChange(this.key);

        // toggle active state
        if (this.item.items) {
            this.active = !this.active;
        } else {
            // activate item
            this.active = true;
        }
    }
}
