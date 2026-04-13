export class BaseModel {
    id?: string;
    name?: string;
    createdAt?: Date | string;
    createdBy?: string;
    updatedAt?: Date | string;
    updatedBy?: string;
    deletedAt?: Date | string;
    deletedBy?: string;
    isDeleted?: boolean;
    isError?: boolean;

    constructor(init?: Partial<BaseModel>) {
        Object.assign(this, init);
    }
}
