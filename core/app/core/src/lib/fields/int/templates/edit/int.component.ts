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

import {Component} from '@angular/core';
import {BaseNumberComponent} from '../../../base/base-number.component';
import {SystemConfigStore} from '../../../../store/system-config/system-config.store';
import {DataTypeFormatter} from '../../../../services/formatters/data-type.formatter.service';
import {UserPreferenceStore} from '../../../../store/user-preference/user-preference.store';
import {FieldLogicManager} from '../../../field-logic/field-logic.manager';
import {FormControl} from '@angular/forms';
import {FieldLogicDisplayManager} from '../../../field-logic-display/field-logic-display.manager';

@Component({
    selector: 'scrm-int-edit',
    templateUrl: './int.component.html',
    styleUrls: []
})
export class IntEditFieldComponent extends BaseNumberComponent {
    public intValue = 0;
    public intValueFormControl: FormControl = new FormControl(this.intValue);

    constructor(
        protected userPreferences: UserPreferenceStore,
        protected systemConfig: SystemConfigStore,
        protected typeFormatter: DataTypeFormatter,
        protected logic: FieldLogicManager,
        protected logicDisplay: FieldLogicDisplayManager,
    ) {
        super(userPreferences, systemConfig, typeFormatter, logic, logicDisplay);
    }

    ngOnInit(): void {
        this.subscribeIntValueChanges();

        super.ngOnInit();
        this.subscribeValueChanges();
    }

    ngOnDestroy(): void {
        this.unsubscribeAll();
    }

    private subscribeIntValueChanges(): void {
        this.subs.push(
            this.intValueFormControl.valueChanges.subscribe(valueChanges => {
                this.intValue = valueChanges;
                if (this.field.value !== valueChanges) {
                    const value = valueChanges.toString();
                    this.field.value = value;
                    this.field.formControl?.setValue(value);
                }
            })
        );
        this.subs.push(
            this.field.valueChanges$.subscribe((fieldValue) => {
                const intValue = parseInt(fieldValue.value) || 0;

                this.intValue = intValue;
                if (this.intValueFormControl.value !== intValue) {
                    this.intValueFormControl.setValue(intValue);
                }
            })
        );
    }
}
