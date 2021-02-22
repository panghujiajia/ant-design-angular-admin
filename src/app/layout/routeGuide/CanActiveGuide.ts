import {
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
	Router,
	CanActivateChild,
} from '@angular/router';
import cloneDeep from 'lodash/cloneDeep';

import { asyncRouterMap } from '../../configs/menuConfig';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable()
export class CanActiveGuide implements CanActivateChild {
	constructor(
		private router: Router,
		private store: Store<{ common: any }>
	) {}
	canActivateChild(
		childRoute: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	):
		| boolean
		| import('@angular/router').UrlTree
		| import('rxjs').Observable<boolean | import('@angular/router').UrlTree>
		| Promise<boolean | import('@angular/router').UrlTree> {
		const { url } = state;
		if (!this.IsLogined()) {
			this.router.navigate(['login']);
		}
		if (!this.CanRouteIn(url)) {
			this.router.navigate(['403']);
		}
		return true;
	}

	/**
	 * 判断是否能进入当前用户能进入的路由
	 * @param url
	 */
	private CanRouteIn(url) {
		const accessRouters = this.getAccessRouter();
		let list = cloneDeep(accessRouters),
			len = list.length,
			i = 0,
			pathList = [];
		for (; i < len; i++) {
			const item = list[i];
			if (item.children && item.children.length) {
				pathList = [
					...pathList,
					...this.GetChildren(item.path, item.children),
				];
			} else {
				pathList = [...pathList, `/${item.path}`];
			}
		}
		// 排除掉根路径
		pathList.push('/');
		return pathList.includes(url);
	}
	// 是否有该页面
	private HavePage(url) {
		// 全部路由表
		const asyncRouters = cloneDeep(asyncRouterMap);
		let len = asyncRouters.length,
			i = 0,
			pathList = [];
		for (; i < len; i++) {
			const item = asyncRouters[i];
			if (item.children && item.children.length) {
				pathList = [
					...pathList,
					...this.GetChildren(item.path, item.children),
				];
			} else {
				pathList = [...pathList, `/${item.path}`];
			}
		}
		// 排除掉根路径
		pathList.push('/');
		return pathList.includes(url);
	}
	// 从ngrx获取路由表
	private getAccessRouter() {
		let accessRouters: any = [];
		this.store.subscribe(state => {
			accessRouters = state.common.menuList;
		});
		return accessRouters;
	}
	/**
	 * 获取child的path
	 * @param children
	 */
	private GetChildren(pPath, children) {
		let pathList = [];
		children.forEach(item => {
			pathList.push(`/${pPath}/${item.path}`);
		});
		return pathList;
	}

	/**
	 * 是否登录
	 */
	private IsLogined(): boolean {
		let token = this.getToken();
		return !!token;
	}

	getToken() {
		return '12121';
		throw new Error('Method not implemented.');
	}
}
