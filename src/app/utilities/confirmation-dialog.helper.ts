import { custom } from 'devextreme/ui/dialog';

export class CustomConfirmationDialogParamsModel {
    type: 'info' | 'delete' = 'info';
    title = 'Custom Popup';
    content = '';
    contentWidth = 300;
    buttonOkText = 'Yes';
    buttonCancelText = 'No';
    buttonCancelVisible = true;

    constructor(init?: Partial<CustomConfirmationDialogParamsModel>) {
        Object.assign(this, init);
    }
}

export const DIALOG_MESSAGES = {
    DISCARD_CHANGES_TITLE: 'Discard Changes',
    DISCARD_CHANGES_CONTENT: 'Are you sure you want to discard changes?'
}

export class ConfirmationDialogHelper {
    //#region
    public static generateDiscardChangesDefaultParams(params?: {
        contentWidth?: number
    }) {
        return new CustomConfirmationDialogParamsModel({
            type: 'info',
            title: DIALOG_MESSAGES.DISCARD_CHANGES_TITLE,
            content: DIALOG_MESSAGES.DISCARD_CHANGES_CONTENT,
            contentWidth: params?.contentWidth ?? 300,
            buttonOkText: 'Yes',
            buttonCancelText: 'No',
            buttonCancelVisible: true
        });
    }
    //#endregion

    //#region
    public static custom(params: CustomConfirmationDialogParamsModel): Promise<boolean> {
        return new Promise((resolve) => {
            const messageHtml = `<div style='width: ${params.contentWidth}'>${params.content}<div/>`;

            const confirmDialog = custom({
                title: params.title,
                messageHtml: messageHtml,
                dragEnabled: false,
                buttons: [
                    {
                        text: params.buttonOkText,
                        height: 40,
                        stylingMode: 'contained',
                        type: params.type === 'info' ? 'default' : 'danger',
                        onClick: () => {
                            resolve(true);
                        }
                    }, {
                        text: params.buttonCancelText,
                        visible: params.buttonCancelVisible,
                        height: 40,
                        stylingMode: 'contained',
                        onClick: () => {
                            confirmDialog.hide();
                            resolve(false);
                        }
                    }
                ]
            });
            //
            confirmDialog.show();
            this._manipulateDialog(confirmDialog);
        })
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private static _manipulateDialog(confirmDialog: any) {
        const CUSTOM_DIALOG_CLASS = 'custom-confirm-dialog';
        const dialogWrappers = document.getElementsByClassName('dx-overlay-wrapper dx-popup-wrapper dx-dialog-wrapper dx-dialog-root dx-overlay-shader');
        //
        const dialogWrapperElement = dialogWrappers && dialogWrappers[0] ? dialogWrappers[0] : undefined;
        if (!dialogWrapperElement) {
            return;
        }
        //
        dialogWrapperElement.classList.add(CUSTOM_DIALOG_CLASS);
        //
        const handleKeydownHandler = (event: Event) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            if (event?.key === 'Escape' || event?.keyCode === 27) {
                document.removeEventListener('keydown', handleKeydownHandler);
                confirmDialog?.hide();
            }
        };

        document.addEventListener('keydown', handleKeydownHandler);
    }
    //#endregion
}

/*
        contentWidth: number = 300,
        buttonOk: string = 'Yes',
        buttonCancel: string = 'No',
        visibleNoBtn: boolean = true
*/
