import { Component, OnInit } from '@angular/core';

@Component({
    standalone: true,
    selector: 'app-auth-sign-up',
    templateUrl: 'sign-up.component.html',
    styleUrl: 'sign-up.component.scss'
})
export class SignUpComponent implements OnInit {
    ngOnInit(): void {
        console.log('This is SignUp');
    }
}
