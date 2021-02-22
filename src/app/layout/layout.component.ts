import { Component, OnInit } from '@angular/core';
import Scrollbar from 'smooth-scrollbar';
import { Store } from '@ngrx/store';
import { RouterService } from '../services/router.service';
import { SaveMenuList } from '../stores/actions/bus.action';

@Component({
	selector: 'app-layout',
	templateUrl: './layout.component.html',
	styleUrls: ['./layout.component.less'],
})
export class LayoutComponent implements OnInit {
	isCollapsed: boolean = false; // 菜单折叠状态
	isSpinning: boolean; // 页面loading
	constructor(
		private store: Store<{ common: any }>,
		private routerService: RouterService
	) {}

	ngOnInit() {
		this.store.subscribe(state => {
			this.isSpinning = state.common.isSpinning;
		});
		// 获取路由表
		this.routerService.getRouters().subscribe(res => {
			this.store.dispatch(SaveMenuList({ menuList: res }));
		});
		// 滚动条初始化
		Scrollbar.initAll();
	}

	getCollapsed(isCollapsed: boolean) {
		this.isCollapsed = isCollapsed;
	}
}
