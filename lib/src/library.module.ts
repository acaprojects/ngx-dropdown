/**
 * @Author: Alex Sorafumo
 * @Email:  alex@yuion.net
 */

import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { ScrollingModule } from '@angular/cdk/scrolling';
import { AOverlayModule } from '@acaprojects/ngx-overlays';

import { DropdownComponent } from './components/dropdown/dropdown.component';
import { CustomDropdownComponent } from './components/custom-dropdown/custom-dropdown.component';

import { LIBRARY_SETTINGS } from './settings';

import * as day_api from 'dayjs';
const dayjs = day_api;

const COMPONENTS: Type<any>[] = [
    DropdownComponent,
    CustomDropdownComponent
];

@NgModule({
    declarations: [
        ...COMPONENTS
    ],
    imports: [
        CommonModule,
        FormsModule,
        ScrollingModule,
        AOverlayModule
    ],
    exports: [
        ...COMPONENTS
    ]
})
class LibraryModule {
    public static version = '0.3.2';
    private static init = false;
    private build = dayjs(1557718725000);

    constructor() {
        if (!LibraryModule.init) {
            const now = dayjs();
            LibraryModule.init = true;
            const build = now.isSame(this.build, 'd') ? `Today at ${this.build.format('h:mmA')}` : this.build.format('D MMM YYYY, h:mmA');
            LIBRARY_SETTINGS.version(LibraryModule.version, build);
        }
    }
}

export { LibraryModule as ACA_DROPDOWN_MODULE };
export { LibraryModule as DropdownModule };
