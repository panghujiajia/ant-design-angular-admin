import { Component, OnInit, Input } from '@angular/core';
import Scrollbar from 'smooth-scrollbar';
import { Store } from '@ngrx/store';
import { asyncRouterMap } from 'src/app/configs/menuConfig';
import { Router } from '@angular/router';

@Component({
	selector: 'app-aside',
	templateUrl: './aside.component.html',
	styleUrls: ['./aside.component.less'],
})
export class AsideComponent implements OnInit {
	@Input() isCollapsed: boolean;
	menuList: any[]; // 菜单列表
	isOpen: boolean = true; // 子菜单展开状态
	constructor(
		private router: Router,
		private store: Store<{ common: any }>
	) {}

	ngOnInit() {
		this.store.subscribe(state => {
			this.menuList = state.common.menuList;
		});
		Scrollbar.initAll();
	}

	// 点击菜单
	handleClickMenu(path: string) {
		this.router.navigate([path]);
	}
}
