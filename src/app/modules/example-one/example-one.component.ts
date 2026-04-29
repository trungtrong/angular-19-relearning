import { Component, OnInit } from '@angular/core';

@Component({
    standalone: true,
    selector: 'app-example-one',
    templateUrl: 'example-one.component.html',
    styleUrl: 'example-one.component.scss',
    imports: [
    ]
})
export class ExampleOneComponent implements OnInit {
    ngOnInit(): void {
        console.log('This is example-one Page');
    }
}
