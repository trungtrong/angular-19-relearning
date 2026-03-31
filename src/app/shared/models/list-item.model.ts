export class ListItemModel<T1, T2> {
    key?: T1;
    value?: T2;
    visible?: boolean;
    disabled?: boolean;
    isDeleted?: boolean;
    isError?: boolean;

    public constructor(init?: Partial<ListItemModel<T1, T2>>) {
        Object.assign(this, init);
    }
}
