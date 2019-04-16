import { Component, OnInit, Input, ViewChild, TemplateRef, ElementRef, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'a-custom-dropdown',
    templateUrl: './custom-dropdown.component.html',
    styleUrls: ['./custom-dropdown.component.scss']
})
export class CustomDropdownComponent {
    /** CSS class to add to the root element of the component */
    @Input() public klass = 'default';
    /** Header template reference */
    @Input() public header: TemplateRef<any>;
    /** Content template reference */
    @Input() public contents: TemplateRef<any>;
    /** Emitter for changes in the show state */
    @Output() public showChange = new EventEmitter<boolean>();
    
    /** Font size of 1em in pixels */
    public font_size = 16;
    /** Width of the dropdown */
    public width = 128;
    /** Whether to show list tooltip */
    public show: boolean;
    /** Timeout for closing the tooltip */
    private close_timer: number;

    /** Reference HTML element for getting the font size */
    @ViewChild('ref') private reference: ElementRef<HTMLDivElement>;
    /** Template Reference for the dropdown tooltip contents */
    @ViewChild(TemplateRef) private dropdown_tooltip: TemplateRef<any>
    /** Dropdown list element */
    @ViewChild('viewport') private scroll_el: ElementRef;

    public ngAfterViewInit(): void {
        this.resize();
    }

    /**
     * Update the value of display relate properties 
     */
    public resize() {
        if (this.reference && this.reference.nativeElement) {
            this.font_size = this.reference.nativeElement.clientHeight;
            this.width = this.reference.nativeElement.clientWidth + 1;
        }
    }


    /**
     * Toggle the show state of the dropdown tooltip
     */
    public toggleShow() {
        this.show = !this.show;
        this.showChange.emit(this.show);
        this.cancelClose()
    }


    /**
     * Close the dropdown tooltip
     */
    public close() {
        if (this.close_timer) {
            clearTimeout(this.close_timer);
            this.close_timer = null;
        }
        this.close_timer = <any>setTimeout(() => this.show = false, 100);
    }

    /**
     * Cancel closing the dropdown tooltip
     */
    public cancelClose() {
        setTimeout(() => {
            if (this.close_timer) {
                clearTimeout(this.close_timer);
                this.close_timer = null;
            }
        }, 50);
    }
}
