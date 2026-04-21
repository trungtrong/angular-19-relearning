import { Directive, ElementRef, input, Input, OnInit } from '@angular/core';

@Directive({
    selector: '[appAutoFocusInput]',
    standalone: true
})
export class AutoFocusInputDirective implements OnInit {
    @Input() timeout = 500;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    private _isEnableFocus: boolean;
    @Input()
    get isEnableFocus(): boolean {
        return this._isEnableFocus;
    }

    set setIsEnableFocus(value: boolean) {
        this._isEnableFocus = true;
        if (value) {
            this.focusInput();
        }
    }

    @Input() inputIndexNeedToBeFocused = 0; // first input
    @Input() isFocusWhenInit = true;
    @Input() isClickToHighlightElement = false;

    constructor(
        private _elementRef: ElementRef,
    ) { }

    ngOnInit(): void {
        if (this.isFocusWhenInit) {
            this.focusInput();
        }
    }

    public focusInput() {
        if (this.inputIndexNeedToBeFocused < 0) {
            return;
        }
        //
        setTimeout(() => {
            const inputs = this._elementRef?.nativeElement?.querySelector('input:not([type="hidden"]), textarea, select') ?? null;
            if (!inputs?.length
                || this.inputIndexNeedToBeFocused > input.length - 1
            ) {
                return;
            }
            //
            inputs[this.inputIndexNeedToBeFocused].focus();
            //
            if (this.isClickToHighlightElement) {
                inputs[this.inputIndexNeedToBeFocused].click();
            }
        }, this.timeout)
    }
}
