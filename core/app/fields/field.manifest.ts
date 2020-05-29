import {VarcharDetailFieldModule} from '@fields/varchar/templates/detail/varchar.module';
import {VarcharDetailFieldComponent} from '@fields/varchar/templates/detail/varchar.component';
import {IntDetailFieldModule} from '@fields/int/templates/detail/int.module';
import {IntDetailFieldComponent} from '@fields/int/templates/detail/int.component';
import {FloatDetailFieldModule} from '@fields/float/templates/detail/float.module';
import {FloatDetailFieldComponent} from '@fields/float/templates/detail/float.component';
import {PhoneDetailFieldModule} from '@fields/phone/templates/detail/phone.module';
import {PhoneDetailFieldComponent} from '@fields/phone/templates/detail/phone.component';
import {DateDetailFieldModule} from '@fields/date/templates/detail/date.module';
import {DateTimeDetailFieldModule} from '@fields/datetime/templates/detail/datetime.module';
import {DateDetailFieldComponent} from '@fields/date/templates/detail/date.component';
import {DateTimeDetailFieldComponent} from '@fields/datetime/templates/detail/datetime.component';

export const fieldModules = [
    VarcharDetailFieldModule,
    IntDetailFieldModule,
    FloatDetailFieldModule,
    PhoneDetailFieldModule,
    DateDetailFieldModule,
    DateTimeDetailFieldModule
];
export const fieldComponents = [
    VarcharDetailFieldComponent,
    IntDetailFieldComponent,
    FloatDetailFieldComponent,
    PhoneDetailFieldComponent,
    DateDetailFieldComponent,
    DateTimeDetailFieldComponent
];

export const viewFieldsMap = {
    'varchar.list': VarcharDetailFieldComponent,
    'varchar.detail': VarcharDetailFieldComponent,
    'char.list': VarcharDetailFieldComponent,
    'char.detail': VarcharDetailFieldComponent,
    'int.list': IntDetailFieldComponent,
    'int.detail': IntDetailFieldComponent,
    'float.list': FloatDetailFieldComponent,
    'float.detail': FloatDetailFieldComponent,
    'phone.list': PhoneDetailFieldComponent,
    'phone.detail': PhoneDetailFieldComponent,
    'date.list': DateDetailFieldComponent,
    'date.detail': DateDetailFieldComponent,
    'datetime.list': DateTimeDetailFieldComponent,
    'datetime.detail': DateTimeDetailFieldComponent
};
