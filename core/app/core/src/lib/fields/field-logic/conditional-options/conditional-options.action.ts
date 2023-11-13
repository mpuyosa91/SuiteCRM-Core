/**
 * SuiteCRM is a customer relationship management program developed by SalesAgility Ltd.
 * Copyright (C) 2023 SalesAgility Ltd.
 *
 * This program is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License version 3 as published by the
 * Free Software Foundation with the addition of the following permission added
 * to Section 15 as permitted in Section 7(a): FOR ANY PART OF THE COVERED WORK
 * IN WHICH THE COPYRIGHT IS OWNED BY SALESAGILITY, SALESAGILITY DISCLAIMS THE
 * WARRANTY OF NON INFRINGEMENT OF THIRD PARTY RIGHTS.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * In accordance with Section 7(b) of the GNU Affero General Public License
 * version 3, these Appropriate Legal Notices must retain the display of the
 * "Supercharged by SuiteCRM" logo. If the display of the logos is not reasonably
 * feasible for technical reasons, the Appropriate Legal Notices must display
 * the words "Supercharged by SuiteCRM".
 */

import {Injectable} from '@angular/core';
import {Action, Field, Option, Record, ViewMode} from 'common';
import {ActionableFieldLogicActionHandler} from '../actionable-field-logic/actionable-field-logic.action';
import {ActiveLogicChecker} from '../../../services/logic/active-logic-checker.service';

interface ConditionalOptionsParams {
    conditionalOptions?: (Option & Action)[];
}

@Injectable({
    providedIn: 'root'
})
export class ConditionalOptionsAction extends ActionableFieldLogicActionHandler {

    key = 'conditional-options';
    modes = ['detail', 'edit', 'create'] as ViewMode[];

    constructor(
        protected activeLogicChecker: ActiveLogicChecker
    ) {
        super(activeLogicChecker);
    }

    executeLogic(logicIsActive: boolean, params: ConditionalOptionsParams, field: Field, record: Record) {
        const conditionalOptions = params.conditionalOptions ?? [];
        const currentFieldOptions: { [key: string]: Option } = {};

        conditionalOptions.forEach((conditionalOption) => {
            const isActive = this.activeLogicChecker.run(record, conditionalOption);

            if (!isActive) {
                return;
            }

            currentFieldOptions[conditionalOption.value] = {
                value: conditionalOption.value ?? '',
                label: conditionalOption.label ?? '',
                labelKey: conditionalOption.labelKey ?? ''
            };
        });

        field.metadata.conditionalOptions = currentFieldOptions;
        field.options = [...(field.options ?? [])];
    }
}
