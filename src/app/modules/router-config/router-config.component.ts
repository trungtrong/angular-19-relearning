import { Component, OnInit } from '@angular/core';
import { CanComponentDeactivate, CanDeactiveGuard } from '@app/core/guards';
import { ConfirmationDialogHelper } from '@app/utilities';

@Component({
    standalone: true,
    selector: 'app-router-config',
    templateUrl: 'router-config.component.html',
    styleUrl: 'router-config.component.scss',
    imports: [
    ]
})
export class RouterConfigComponent implements OnInit, CanComponentDeactivate {

    showDiscardChangesPopup = false;

    isDataChanged = true;

    constructor(private _canDeactiveGuard: CanDeactiveGuard) {

    }

    ngOnInit(): void {
        console.log('This is router-config Page');
    }

    async canDeactivate() {
        // Show Popup Discard Changes
        /**
         * Need:
         * - Async function in here to wait for Discard Changes popup status
         * - based on isDataChanged in form -> open DC popup or not
         *
         * 1. Solution 1: Create Discard changes in App module level ->
         */
        if (this.isDataChanged) {
            const isDiscardChanges = await ConfirmationDialogHelper.custom(
                ConfirmationDialogHelper.generateDiscardChangesDefaultParams()
            );
            //
            if (isDiscardChanges) {
                this.isDataChanged = false;
            }
            return isDiscardChanges;
        }
        //
        return true;
    }
}
