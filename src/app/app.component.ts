import { Component, ViewContainerRef, ViewEncapsulation, OnInit, ViewChild } from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

import { AppService } from './services/app.service';

import * as day_api from 'dayjs';
const dayjs = day_api;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

    public model: { [name: string]: any } = {};
    /** List scroll viewport */
    @ViewChild(CdkVirtualScrollViewport) private viewport: CdkVirtualScrollViewport;

    constructor(private view: ViewContainerRef, private service: AppService) {
    }

    public ngOnInit(): void {
        this.model.list = Array(100).fill('Item').map((v, i) => `${v} ${i + 1}`);
        this.model.item = this.model.list[Math.floor(Math.random() * this.model.list.length)];
    }

    public reset() {
        this.model.date = dayjs().valueOf();
    }

    public updateScroll() {
        setTimeout(() => {
            if (!this.viewport) {
                return setTimeout(() => this.updateScroll(), 50);
            }
                // Add scroll viewport to element to allow for debugging and easier e2e testing
            this.viewport.elementRef.nativeElement.scroll_viewport = this.viewport;
            const model_id = (typeof this.model === 'string' ? this.model : this.model.id);
            this.viewport.scrollToIndex(10);
        }, 50);
    }

}
