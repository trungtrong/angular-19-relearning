import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    standalone: true,
    selector: 'app-auth',
    templateUrl: 'auth.component.html',
    styleUrl: 'auth.component.scss',
    imports: [RouterOutlet]
})
export class AuthComponent implements OnInit {
    ngOnInit(): void {
        console.log('This is Authentication');
    }
}
