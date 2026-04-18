export class SidebarMenuTabViewModel {
    id?: string;
    name?: string;
    isExpanded?: boolean = false;
    disabled?: boolean;
    visible?: boolean;
    //
    subTabs?: SidebarMenuTabViewModel[] = [];
    routerLink?: string;
    // To make it active if its child is active
    routerLinksOfSubTabs?: string[] = [];

    constructor(init?: Partial<SidebarMenuTabViewModel>) {
        Object.assign(this, init);
    }
}
