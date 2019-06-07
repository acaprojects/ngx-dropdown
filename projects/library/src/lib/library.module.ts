import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { AOverlayModule } from '@acaprojects/ngx-overlays';

import { version } from './settings';

import * as dayjs_api from 'dayjs';
const dayjs = dayjs_api;

import { ADropdownComponent } from './components/dropdown/dropdown.component';
import { ACustomDropdownComponent } from './components/custom-dropdown/custom-dropdown.component';


@NgModule({
    declarations: [
        ADropdownComponent,
        ACustomDropdownComponent
    ],
    imports: [CommonModule, AOverlayModule, ScrollingModule, FormsModule, ReactiveFormsModule],
    exports: [
        ADropdownComponent,
        ACustomDropdownComponent
    ]
})
export class LibraryModule {
    public static version = 'local-dev';
    private static init = false;
    readonly build = dayjs();

    constructor() {
        if (!LibraryModule.init) {
            const now = dayjs();
            LibraryModule.init = true;
            const build = now.isSame(this.build, 'd') ? `Today at ${this.build.format('h:mmA')}` : this.build.format('D MMM YYYY, h:mmA');
            version(LibraryModule.version, build);
        }
    }
}

export { LibraryModule as ACA_DROPDOWNS_MODULE };
export { LibraryModule as ADropdownsModule };
