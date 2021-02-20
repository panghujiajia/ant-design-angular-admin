import { Component, OnInit } from '@angular/core';
import Scrollbar from 'smooth-scrollbar';
import { Store } from '@ngrx/store';

@Component({
	selector: 'app-layout',
	templateUrl: './layout.component.html',
	styleUrls: ['./layout.component.less'],
})
export class LayoutComponent implements OnInit {
	isCollapsed: boolean = false; // 菜单折叠状态
	isSpinning: boolean; // 页面loading
	constructor(private store: Store<{ common: any }>) {}

	ngOnInit() {
		this.store.subscribe(state => {
			this.isSpinning = state.common.isSpinning;
		});
		// 滚动条初始化
		Scrollbar.initAll();
	}

	getCollapsed(isCollapsed: boolean) {
		this.isCollapsed = isCollapsed;
	}
}
