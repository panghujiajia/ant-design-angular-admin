import {
	CanActivate,
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
	Router,
	CanActivateChild,
	Route,
	CanLoad,
	UrlSegment,
} from '@angular/router';

import { MENU_LIST } from '../../configs/menuConfig';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class CanActiveGuide implements CanLoad, CanActivate, CanActivateChild {
	constructor(private router: Router) {}
	canLoad(
		route: Route,
		segments: UrlSegment[]
	): boolean | Promise<boolean> | Observable<boolean> {
		console.log(1111);
		
		console.log(route);
		return true;
		throw new Error('Method not implemented.');
	}
	canActivateChild(
		childRoute: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	):
		| boolean
		| import('@angular/router').UrlTree
		| import('rxjs').Observable<boolean | import('@angular/router').UrlTree>
		| Promise<boolean | import('@angular/router').UrlTree> {
		// console.log(childRoute);
		// console.log(state);
		if (!this.IsLogined()) {
			this.router.navigate(['login']);
		}
		if (!this.CanRouteIn(state)) {
			// this.router.navigate(["403"]);
		}
		return true;
	}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	):
		| boolean
		| import('@angular/router').UrlTree
		| import('rxjs').Observable<boolean | import('@angular/router').UrlTree>
		| Promise<boolean | import('@angular/router').UrlTree> {
		// console.log(route);
		// console.log(state);
		if (!this.IsLogined()) {
			this.router.navigate(['login']);
		}
		if (!this.CanRouteIn(state)) {
			// this.router.navigate(["403"]);
		}
		return true;
	}

	/**
	 * 判断是否能进入当前用户能进入的路由
	 * @param state
	 */
	private CanRouteIn(state: RouterStateSnapshot) {
		let list = MENU_LIST,
			len = list.length,
			i = 0;
		let pathList = [];
		for (; i < len; i++) {
			const item = list[i];
			if (item.children && item.children.length) {
				pathList = [...pathList, ...this.GetChildren(item.children)];
			}
		}
		// 排除掉根路径
		pathList.push('/');
		// console.log(pathList);
		return pathList.includes(state.url);
	}

	/**
	 *
	 * @param children
	 */
	private GetChildren(children) {
		let pathList = [];
		children.forEach(item => {
			pathList.push(item.path);
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
