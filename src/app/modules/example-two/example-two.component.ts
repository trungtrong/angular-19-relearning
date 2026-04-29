import { Component, OnInit } from '@angular/core';

@Component({
    standalone: true,
    selector: 'app-example-two',
    templateUrl: 'example-two.component.html',
    styleUrl: 'example-two.component.scss',
    imports: [
    ]
})
export class ExampleTwoComponent implements OnInit {
    ngOnInit(): void {
        console.log('This is example-two Page');
    }
}
