import {
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
	Router,
	CanActivateChild,
} from '@angular/router';
import cloneDeep from 'lodash/cloneDeep';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { RouterService } from 'src/app/services/router.service';
import { SaveMenuList } from 'src/app/stores/actions/bus.action';

@Injectable()
export class CanActiveGuide implements CanActivateChild {
	constructor(
		private router: Router,
		private routerService: RouterService,
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
		// 从状态管理拿路由表
		let accessRouters = this.getNgrxAccessRouter();
		console.log('store', accessRouters);
		// 没拿到就去接口拿
		if (!accessRouters.length) {
			accessRouters = this.getApiAccessRouter();
			console.log('api', accessRouters);
		}
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
	// 从ngrx获取路由表
	private getNgrxAccessRouter() {
		let accessRouters: any = [];
		// 获取路由表
		this.store.subscribe(state => {
			accessRouters = state.common.menuList;
		});
		return accessRouters;
	}
	// 从接口拿路由表
	private getApiAccessRouter() {
		let accessRouters: any = [];
		// 获取路由表
		this.routerService.getRouters().subscribe(res => {
			accessRouters = res;
			this.store.dispatch(SaveMenuList({ menuList: res }));
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

	private getToken() {
		let token: string = '';
		this.store.subscribe(state => {
			token = state.common.token;
		});
		return 'token';
	}
}
