import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLinkActive } from "@angular/router";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
//
import { DxScrollViewModule } from 'devextreme-angular';
import { QuicklinkDirective } from "ngx-quicklink";
import { filter } from 'rxjs';
//
import { FunctionPipe } from '@app/common/pipes';
import { SidebarMenuTabViewModel } from '@app/shared/models';
import { StringHelper } from '@app/utilities';

@Component({
    standalone: true,
    selector: 'app-sidebar-menu',
    templateUrl: 'sidebar-menu.component.html',
    styleUrl: 'sidebar-menu.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        //
        DxScrollViewModule,
        //
        FunctionPipe,
        QuicklinkDirective,
        RouterLinkActive
    ]
})
export class SidebarMenuComponent implements OnInit {
    @Input() tabs: SidebarMenuTabViewModel[] = [];
    @Input() tabSelected: SidebarMenuTabViewModel = new SidebarMenuTabViewModel();
    @Input() isNavigateByRouterLink = true;

    currentUrl = '';

    private _destroyRef = inject(DestroyRef);

    constructor(private _router: Router,
                private _changeDetectionRef: ChangeDetectorRef
    ) {
    }

    ngOnInit(): void {
        this.currentUrl = this._router.url;
        console.log('This is SidebarMenuComponent');
        if (this.isNavigateByRouterLink) {
            this.monitorCurrentUrl();
        } else {
            this.tabSelected = this.tabs[0];
            this._changeDetectionRef.markForCheck();
        }
    }

    monitorCurrentUrl() {
        this._router.events.pipe(
            filter((event): event is NavigationEnd => event instanceof NavigationEnd),
            takeUntilDestroyed(this._destroyRef)
        ).subscribe((event: NavigationEnd) => {
            this.currentUrl = event.url;
        })
    }

    //#region Parent Tabs
    isParentTabActive = (currentUrl: string, routerLinksOfSubTabs: string[]) => {
        return !StringHelper.isValueEmpty(currentUrl) && routerLinksOfSubTabs?.length > 0
            ? routerLinksOfSubTabs.includes(currentUrl)
            : false;
    }

    onToggleParentTab(tab: SidebarMenuTabViewModel) {
        console.log(tab);
    }
    //#endregion

    trackByFn = (index: number) => {
        return index;
    }
}
