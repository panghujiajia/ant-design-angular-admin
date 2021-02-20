import { Component, OnInit } from '@angular/core';
import Scrollbar from 'smooth-scrollbar';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Component({
	selector: 'app-layout',
	templateUrl: './layout.component.html',
	styleUrls: ['./layout.component.less'],
})
export class LayoutComponent implements OnInit {
	isCollapsed: boolean = false; // 菜单折叠状态
	isSpinning: boolean; // 页面loading
	constructor(
		private router: Router,
		private store: Store<{ common: any }>
	) {}

	ngOnInit() {
		this.store.subscribe(state => {
			this.isSpinning = state.common.isSpinning;
		});
		// 滚动条初始化
		Scrollbar.initAll();

		this.router.navigate(['login']);
	}

	getCollapsed(isCollapsed: boolean) {
		this.isCollapsed = isCollapsed;
	}
}
