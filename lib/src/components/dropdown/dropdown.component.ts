import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ViewChild, ElementRef, AfterViewInit, TemplateRef, forwardRef } from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type DropdownItem = string | { id: string; name: string; [prop: string]: any };

export interface IDropdownOptions {
    /** Whether to hide active item from the list */
    hide_active?: boolean;
    /** Whether to show filter input field */
    can_filter?: boolean;
/** Display string for no items displayed */
    no_item_text?: string;
}

declare global {
    interface HTMLElement {
        scroll_viewport: CdkVirtualScrollViewport;
    }
}

type FIELD_TYPE = DropdownItem;

@Component({
    selector: 'a-dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DropdownComponent),
            multi: true
        }
    ]
})
export class DropdownComponent implements OnChanges, AfterViewInit, ControlValueAccessor {
    /** CSS class to add to the root element of the component */
    @Input() public klass = 'default';
    /** List of items to show as options on the dropdown */
    @Input() public items: DropdownItem[] = [];
    /** Placeholder display string */
    @Input() public placeholder = 'Test Item test test';
    /** Search filter string */
    @Input() public search: string;
    /** Options for the dropdown display */
    @Input() public options: IDropdownOptions;
    /** Emitter for changes to the search filter string */
    @Output() public searchChange = new EventEmitter<string>();

    /** Item with the longest name to use for sizing purposes */
    public longest: DropdownItem;
    /** Font size of 1em in pixels */
    public font_size = 16;
    /** Width of the dropdown */
    public width = 128;
    /** Filtered items */
    public filtered_items: DropdownItem[] = [];
    /** Whether to show list tooltip */
    public show: boolean;
    /** Whether the dropdown is focused */
    public focus: boolean;
    /** Timeout for closing the tooltip */
    private close_timer: number;

    /** Selected dropdown item */
    public selected: FIELD_TYPE;

    /** Form control on change handler */
    private _onChange: (_: FIELD_TYPE) => void;
    /** Form control on touch handler */
    private _onTouch: (_: FIELD_TYPE) => void;

    /** Reference HTML element for getting the font size */
    @ViewChild('ref') private reference: ElementRef<HTMLDivElement>;
    /** Template Reference for the dropdown tooltip contents */
    @ViewChild(TemplateRef) private dropdown_tooltip: TemplateRef<any>;
    /** Search input HTML element */
    @ViewChild('input') private input: ElementRef<HTMLInputElement>;
    /** List scroll viewport */
    @ViewChild(CdkVirtualScrollViewport) private viewport: CdkVirtualScrollViewport;
    /** Dropdown list element */
    @ViewChild('viewport') private scroll_el: ElementRef;

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.items) {
            // Update the item with the longest display
            this.longest = this.items
                .map(i => (typeof i === 'string' ? i : i.name))
                .reduce((a, i) => (i.length > a.length ? i : a), '');
            this.filter();
        }
    }

    public ngAfterViewInit(): void {
        this.resize();
    }

    /**
     * Method for checking if listed items have changed
     */
    public trackByFn(index: number, item: DropdownItem) {
        return item ? (typeof item === 'string' ? item : item.id) : index;
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
     * Filter the item list to be displayed
     */
    public filter() {
        if (this.items) {
            this.filtered_items = this.items;
            // Filter based on search string
            if (this.options && this.options.can_filter && this.search) {
                this.filtered_items = this.filtered_items.filter(
                    i => (typeof i === 'string' ? i : i.name).toLowerCase().indexOf(this.search.toLowerCase()) >= 0
                );
            }
            // Filter out active item
            if (this.options && this.options.hide_active && this.selected) {
                const model_id = typeof this.selected === 'string' ? this.selected : this.selected.id;
                this.filtered_items = this.filtered_items.filter(
                    i => (typeof i === 'string' ? i : i.id).indexOf(model_id) < 0
                );
            }
        }
        console.log('Items:', this.filtered_items);
    }

    /**
     * Toggle the show state of the dropdown tooltip
     */
    public toggleShow() {
        this.show = !this.show;
        if (this.show) {
            this.updateScroll();
        }
        this.cancelClose();
        setTimeout(() => {
            if (this.input) {
                this.input.nativeElement.focus();
            }
        }, 100);
    }

    /**
     * Scroll to the active item in the dropdown list
     */
    private updateScroll() {
        if (!this.viewport || !this.scroll_el) {
            return setTimeout(() => this.updateScroll(), 50);
        }
        // Add scroll viewport to element to allow for debugging and easier e2e testing
        this.viewport.elementRef.nativeElement.scroll_viewport = this.viewport;
        const model_id = typeof this.selected === 'string'
            ? this.selected
            : (this.selected ? this.selected.id : null);
        this.viewport.scrollToIndex(this.filtered_items.findIndex(i => (typeof i === 'string' ? i : i.id) === model_id));
    }

    /**
     * Change the active item
     * @param item New active item
     */
    public select(item: DropdownItem) {
        this.selected = item;
        this.show = false;
        if (this._onChange) {
            this._onChange(this.selected);
        }
    }

    public change(value: number) {
        const model_id = typeof this.selected === 'string' ? this.selected : this.selected.id;
        const index = this.filtered_items.findIndex(i => (typeof i === 'string' ? i : i.id) == model_id);
        const new_index = index + value;
        if (new_index >= 0 && new_index < this.filtered_items.length) {
            this.selected = this.filtered_items[new_index];
            if (this._onChange) {
                this._onChange(this.selected);
            }
            setTimeout(() => this.updateScroll(), 100);
        }
    }

    /**
     * Close the dropdown tooltip
     */
    public close() {
        if (this.close_timer) {
            clearTimeout(this.close_timer);
            this.close_timer = null;
        }
        this.close_timer = <any>setTimeout(() => (this.show = false), 100);
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
    /**
     * Update local value when form control value is changed
     * @param value The new value for the component
     */
    public writeValue(value: FIELD_TYPE) {
        this.selected = value;
        this.show = false;
    }

    /**
     * Registers a callback function that is called when the control's value changes in the UI.
     * @param fn The callback function to register
     */
    public registerOnChange(fn: (_: FIELD_TYPE) => void): void {
        this._onChange = fn;
    }

    /**
     * Registers a callback function is called by the forms API on initialization to update the form model on blur.
     * @param fn The callback function to register
     */
    public registerOnTouched(fn: (_: FIELD_TYPE) => void): void {
        this._onTouch = fn;
    }
}
