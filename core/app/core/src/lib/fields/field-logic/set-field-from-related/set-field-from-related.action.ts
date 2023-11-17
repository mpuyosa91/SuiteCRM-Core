/**
 * @author SalesAgility <info@salesagility.com>.
 */

import {Injectable} from '@angular/core';
import {AttributeMap, EDITABLE_VIEW_MODES, Field, Record} from 'common';
import {
    ActionableFieldLogicActionHandler,
    FieldValueTypes
} from '../actionable-field-logic/actionable-field-logic.action';
import {ActiveLogicChecker} from '../../../services/logic/active-logic-checker.service';
import {map, take} from 'rxjs/operators';
import {RecordFetchGQL} from '../../../store/record/graphql/api.record.get';
import {Observable, of} from 'rxjs';
import {isString} from 'lodash-es';


type RelatedFieldParamType = string | {
    linkFieldName: string;
    toCopyFromFieldName: string;
};

interface RelatedFieldParams {
    nonActiveState?: RelatedFieldParamType;
    activeState?: RelatedFieldParamType;
}

@Injectable({
    providedIn: 'root'
})
export class SetFieldFromRelatedAction extends ActionableFieldLogicActionHandler {

    key = 'setFromRelated';
    modes = EDITABLE_VIEW_MODES;

    constructor(
        protected activeLogicChecker: ActiveLogicChecker,
        protected recordFetchGQL: RecordFetchGQL,
    ) {
        super(activeLogicChecker);
    }

    executeLogic(logicIsActive: boolean, params: RelatedFieldParams, field: Field, record: Record): void {
        this.getToUpdateValue(logicIsActive, params, record)
            .pipe(take(1))
            .subscribe((toUpdateValue) => {
                if (toUpdateValue === null) {
                    return;
                }

                this.updateValue(toUpdateValue, field, record);
            });
    }

    private getToUpdateValue(logicIsActive: boolean, params: RelatedFieldParams, record: Record): Observable<FieldValueTypes | null> {
        const paramAccordingToLogicState = logicIsActive
            ? params.activeState
            : params.nonActiveState;
        const relatedFieldParam = paramAccordingToLogicState ?? null;

        if (relatedFieldParam === null) {
            return of(null);
        }

        if (isString(relatedFieldParam)) {
            return of(relatedFieldParam);
        }

        const toCopyFromFieldName = relatedFieldParam.toCopyFromFieldName;
        if (!toCopyFromFieldName) {
            return of(null);
        }

        const linkFieldName = relatedFieldParam.linkFieldName;
        const relatedIdNameField = record.fields[linkFieldName];
        const relatedIdField = record.fields[relatedIdNameField.definition.id_name];
        if (!relatedIdField) {
            return of(null);
        }

        const module: string = relatedIdField.definition.module;
        const recordId: string = relatedIdField.value;

        return this.getRecordAttributes(module, recordId).pipe(
            map((recordAttributes): (FieldValueTypes | null) => (recordAttributes[toCopyFromFieldName] ?? null))
        );
    }

    private getRecordAttributes(module: string, recordId: string): Observable<AttributeMap> {
        const fields: string[] = ['_id', 'attributes'];

        return this.recordFetchGQL.fetch(module, recordId, {fields}).pipe(
            map((result): AttributeMap => (result?.data?.getRecord?.attributes ?? {}))
        );
    }
}
