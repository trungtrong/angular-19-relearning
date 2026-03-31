export class AttachmentModel {
    name?: string;
    url?: string;
    size?: number;
    extension?: string;

    // UI only
    type?: string;
    isInlineImage?: boolean; // Image such as inline-image on message, Avatar

    constructor(init?: Partial<AttachmentModel>) {
        Object.assign(this, init);
    }
}
