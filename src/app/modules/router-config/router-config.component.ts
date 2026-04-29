import { Component, OnInit } from '@angular/core';

@Component({
    standalone: true,
    selector: 'app-router-config',
    templateUrl: 'router-config.component.html',
    styleUrl: 'router-config.component.scss',
    imports: [
    ]
})
export class RouterConfigComponent implements OnInit {
    ngOnInit(): void {
        console.log('This is router-config Page');
    }
}
