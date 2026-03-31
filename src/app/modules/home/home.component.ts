import { Component, OnInit } from '@angular/core';

@Component({
    standalone: true,
    selector: 'app-home',
    templateUrl: 'home.component.html',
    styleUrl: 'home.component.scss'
})
export class HomeComponent implements OnInit {
    ngOnInit(): void {
        console.log('This is Home Page');
    }
}
