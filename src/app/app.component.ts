import { Component, ViewContainerRef, ViewEncapsulation, OnInit } from '@angular/core';

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

    constructor(private view: ViewContainerRef, private service: AppService) {
    }

    public ngOnInit(): void {
        this.model.list = Array(100).fill('Item').map((v, i) => `${v} ${i + 1}`);
        this.model.item = this.model.list[Math.floor(Math.random() * this.model.list.length)];
    }

    public reset() {
        this.model.date = dayjs().valueOf();
    }

}
