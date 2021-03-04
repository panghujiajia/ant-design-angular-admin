import { Injectable } from '@angular/core';
import { ServicesModule } from './services.module';
import { Observable } from 'rxjs';
import cloneDeep from 'lodash/cloneDeep';
import { asyncRouterMap } from 'src/app/configs/menuConfig';
import { LoginService } from './login/login.service';
import { Store } from '@ngrx/store';
@Injectable({
	providedIn: ServicesModule,
})
export class RouterService {
	constructor(
		private loginService: LoginService,
		private store: Store<{ common: any }>
	) {}
	// 假定以下为用户的路由权限
	private permissions = [
		'welcome',
		'menu',
		'menu:list',
		'menu:add',
		'menu:edit',
		'menu:delete',
		'user',
		'user:list',
		'user:add',
		'user:edit',
		'user:delete',
	];
	// 获取完整菜单列表
	getRouters() {
		return new Observable(observe => {
			const asyncRouters = cloneDeep(asyncRouterMap);
			const accessedRouters = this.getAccessList(asyncRouters);
			observe.next(accessedRouters);
			observe.complete();
		});
	}
	// 获取用户权限菜单
	getAccessList(routers) {
		// 获取到的用户权限
		const roles = this.getPromission();
		const newRouter = routers.map(item => {
			if (this.hasPromission(item, roles)) {
				if (item.children && item.children.length) {
					item.children = this.getAccessList(item.children);
				}
				// 如果给了模块权限，没给路由权限，则不返回
				if (item.children && !item.children.length) {
					return false;
				}
				return item;
			}
			return false;
		});
		return newRouter.filter((item: any) => {
			return item;
		});
	}
	// 判定某个路由是否包含在用户权限表里
	hasPromission(route, roles) {
		if (route.meta && route.meta.role) {
			if (route.meta.role.includes('root')) {
				return true;
			}
			return roles.some(role => {
				return route.meta.role.includes(role);
			});
		} else {
			return false;
		}
	}
	// 获取用户权限
	getPromission() {
		let permissions = [];
		this.store.subscribe(state => {
			permissions = state.common.info.permissions;
		});
		return this.permissions;
	}
}
