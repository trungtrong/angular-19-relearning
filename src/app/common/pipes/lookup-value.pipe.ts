/* eslint-disable @typescript-eslint/no-explicit-any */
import {Pipe, PipeTransform} from '@angular/core';
//
import {ListItemModel} from '@app/shared/models';

@Pipe({
    name: 'lookupValue'
})
export class LookupValuePipe implements PipeTransform {
    transform(key: string | number,
              lookup: Partial<ListItemModel<string | number, string>[]> | any[],
              valueExpr = 'key',
              displayExpr = 'value',
              emptyMessage = '-',
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              valueExprNotFound: string = null): any {
        if (!key) {
            return emptyMessage;
        }
        //
        if(!Array.isArray(lookup)) {
            return `${key}`;
        }
        //
        if (!lookup || lookup.length === 0) {
            return valueExprNotFound != null ? valueExprNotFound : `${key}`;
        }
        //
        const selectedItemIndex: number = lookup.findIndex(_ => _[valueExpr] === key);
        return selectedItemIndex > -1
            ? lookup[selectedItemIndex][displayExpr]
            : valueExprNotFound != null
                ? `${valueExprNotFound}`
                : `${key}`;
    }
}
