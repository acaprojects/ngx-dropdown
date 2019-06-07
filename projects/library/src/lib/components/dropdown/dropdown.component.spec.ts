
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ADropdownComponent } from './dropdown.component';
import { AOverlayModule } from '@acaprojects/ngx-overlays';

describe('ADropdownComponent', () => {
    let fixture: ComponentFixture<ADropdownComponent>;
    let component: ADropdownComponent;
    let clock: jasmine.Clock;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                ADropdownComponent
            ],
            imports: [CommonModule, AOverlayModule, FormsModule, ScrollingModule]
        }).compileComponents();
        fixture = TestBed.createComponent(ADropdownComponent);
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
