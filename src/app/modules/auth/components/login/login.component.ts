import { Component, OnInit } from '@angular/core';

@Component({
    standalone: true,
    selector: 'app-auth-login',
    templateUrl: 'login.component.html',
    styleUrl: 'login.component.scss'
})
export class LoginComponent implements OnInit {
    ngOnInit(): void {
        console.log('This is login');
    }
}
