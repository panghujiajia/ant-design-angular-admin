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
		params = new HttpParams({ fromObject: params });
		return this.http
			.post(`${this.url}/login`, params, {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					Auth: 'false', // 无需token
				},
			})
			.pipe(
				map((res: { success: boolean; message: string }) => {
					if (res.success) {
						return res;
					} else {
						return false;
					}
				})
			);
	}

	info(): Observable<any> {
		return this.http.get(`${this.url}/system/user/info`).pipe(
			map((res: { success: boolean; message: string }) => {
				if (res.success) {
					return res;
				}
				return false;
			})
		);
	}
}
