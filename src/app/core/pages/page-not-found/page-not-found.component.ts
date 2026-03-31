import { Component, OnInit } from '@angular/core';

@Component({
    standalone: true,
    selector: 'app-page-not-found',
    templateUrl: 'page-not-found.component.html',
    styleUrl: 'page-not-found.component.scss'
})
export class PageNotFoundComponent implements OnInit {
    ngOnInit(): void {
        console.log('This is Page Not Found');
    }
}
