import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarMenuTabViewModel } from '@app/shared/models';
//
import { PageLayoutComponent, SidebarMenuComponent } from '@app/theme/components';

@Component({
    standalone: true,
    selector: 'app-home',
    templateUrl: 'home.component.html',
    styleUrl: 'home.component.scss',
    imports: [
        RouterOutlet,
        //
        PageLayoutComponent,
        SidebarMenuComponent
    ]
})
export class HomeComponent implements OnInit {
    sidebarTabs: SidebarMenuTabViewModel[] = [
        new SidebarMenuTabViewModel({
            id: 'Subscriptions',
            name: 'Subscriptions',
            visible: true,
            // routerLink: 'subscription'
        })
    ]

    ngOnInit(): void {
        console.log('This is Home Page');
    }
}
