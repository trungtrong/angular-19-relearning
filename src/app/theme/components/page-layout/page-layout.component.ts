import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, TemplateRef } from '@angular/core';

@Component({
    standalone: true,
    selector: 'app-page-layout',
    templateUrl: 'page-layout.component.html',
    styleUrl: 'page-layout.component.scss',
    imports: [
        CommonModule
    ]
})
export class PageLayoutComponent implements OnInit {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    @Input() leftSidebarTemplate?: TemplateRef<any> | null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    @Input() mainTemplate?: TemplateRef<any> | null;

    ngOnInit(): void {
        console.log('This is PageLayout');
    }
}
