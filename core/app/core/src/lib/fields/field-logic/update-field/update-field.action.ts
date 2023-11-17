/**
 * @author SalesAgility <info@salesagility.com>.
 */

import {Injectable} from '@angular/core';
import {EDITABLE_VIEW_MODES, Field, Record} from 'common';
import {ActionableFieldLogicActionHandler} from '../actionable-field-logic/actionable-field-logic.action';
import {ActiveLogicChecker} from '../../../services/logic/active-logic-checker.service';

type UpdateFieldParamType = string | string[];

interface UpdateFieldParams {
    nonActiveValue?: UpdateFieldParamType;
    activeValue?: UpdateFieldParamType;
}

@Injectable({
    providedIn: 'root'
})
export class UpdateFieldAction extends ActionableFieldLogicActionHandler {

    key = 'updateField';
    modes = EDITABLE_VIEW_MODES;

    constructor(
        protected activeLogicChecker: ActiveLogicChecker,
    ) {
        super(activeLogicChecker);
    }

    executeLogic(logicIsActive: boolean, params: UpdateFieldParams, field: Field, record: Record): void {
        const toUpdateValue = this.getToUpdateValue(logicIsActive, params);

        if (toUpdateValue === null) {
            return;
        }

        this.updateValue(toUpdateValue, field, record);
    }

    private getToUpdateValue(logicIsActive: boolean, params: UpdateFieldParams): UpdateFieldParamType | null {
        const valueAccordingToLogicState = logicIsActive
            ? params.activeValue
            : params.nonActiveValue;

        return valueAccordingToLogicState ?? null;
    }
}
