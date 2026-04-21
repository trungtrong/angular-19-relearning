import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[appIf]',
    standalone: true
})
export class IfDirective {
    @Input() setIf(show: boolean) {
        if (show) {
            this._viewContainerRef.createEmbeddedView(this._templateRef);
        } else {
            this._viewContainerRef.clear();
        }
    }

    constructor(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        private _templateRef: TemplateRef<any>,
        private _viewContainerRef: ViewContainerRef
    ) { }

}
