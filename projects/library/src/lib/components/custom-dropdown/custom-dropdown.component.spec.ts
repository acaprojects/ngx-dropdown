
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ACustomDropdownComponent } from './custom-dropdown.component';
import { AOverlayModule } from '@acaprojects/ngx-overlays';

describe('ACustomDropdownComponent', () => {
    let fixture: ComponentFixture<ACustomDropdownComponent>;
    let component: ACustomDropdownComponent;
    let clock: jasmine.Clock;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                ACustomDropdownComponent
            ],
            imports: [CommonModule, AOverlayModule, FormsModule, ScrollingModule]
        }).compileComponents();
        fixture = TestBed.createComponent(ACustomDropdownComponent);
        component = fixture.debugElement.componentInstance;
        clock = jasmine.clock();
        fixture.detectChanges();
        clock.uninstall();
        clock.install();
    });

    afterEach(() => {
        clock.uninstall();
    });

    it('should create an instance', () => {
        expect(component).toBeTruthy();
    });

    // TODO: add tests
});
