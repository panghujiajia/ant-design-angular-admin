import { Injectable, Inject } from '@angular/core';
import { ServicesModule, PAY_SERVER } from '../services.module';
import { Observable } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/internal/operators';

@Injectable({
	providedIn: ServicesModule,
})
export class LoginService {
	constructor(
		private http: HttpClient,
		@Inject(PAY_SERVER) private url: string,
		private message: NzMessageService
	) {}
	/**
	 * 登录
	 */
	login(params): Observable<any> {
		return new Observable(observe => {
			const token = 'token';
			observe.next(token);
			observe.complete();
		});
	}

	// 获取用户权限
	getUserPermission(): Observable<any> {
		return new Observable(observe => {
			// 假定以下为用户的路由权限
			const permissions = [
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
			observe.next(permissions);
			observe.complete();
		});
	}
}
