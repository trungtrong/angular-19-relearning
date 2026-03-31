import { Component, OnInit } from '@angular/core';

@Component({
    standalone: true,
    selector: 'app-auth-forgot-password',
    templateUrl: 'forgot-password.component.html',
    styleUrl: 'forgot-password.component.scss'
})
export class ForgotPasswordComponent implements OnInit {
    ngOnInit(): void {
        console.log('This is ForgotPasswordComponent');
    }
}
