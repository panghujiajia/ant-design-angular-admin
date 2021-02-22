import { Injectable } from '@angular/core';
import { ServicesModule } from '../services.module';
import { asyncRouterMap } from 'src/app/configs/menuConfig';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: ServicesModule,
})
export class LayoutService {
	constructor() {}

	/**
	 * 取菜单列表
	 */
	getMenuList() {
		return new Observable(observe => {
			observe.next(asyncRouterMap);
			observe.complete();
		});
	}
}
