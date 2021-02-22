import { Injectable } from '@angular/core';
import {
	HttpInterceptor,
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpErrorResponse,
	HttpResponseBase,
	HttpResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, mergeMap, tap } from 'rxjs/internal/operators';
import { NzMessageService } from 'ng-zorro-antd';
import { Store, select } from '@ngrx/store';
import { ChangeIsSpinning } from 'src/app/stores/actions/bus.action';
import { Router } from '@angular/router';
const errObj = {
	400: '错误请求',
	401: '未授权，请重新登录',
	403: '拒绝访问',
	404: '请求错误，未找到该资源',
	405: '请求方法未允许',
	408: '请求超时',
	500: '服务器出错',
	501: '网络未实现',
	502: '网络错误',
	503: '服务不可用',
	504: '网络超时',
	505: 'http版本不支持该请求',
};
@Injectable()
export class CommonInterceptor implements HttpInterceptor {
	constructor(
		private message: NzMessageService,
		private router: Router,
		private store: Store<{ common: any }>
	) {}

	intercept(
		req: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		this.store.dispatch(ChangeIsSpinning({ isSpinning: true }));
		let obj = {};
		// 不需要token的接口需传Auth = false
		// 不传Auth则get到的值为null，表示需要token
		if (!req.headers.get('Auth')) {
			const token = this.getToken();
			if (!token) {
				this.message.info('用户登录信息失效，请重新登录');
				this.router.navigate(['login']);
				return;
			}
			obj = {
				headers: req.headers.set('Authorization', token),
			};
		}
		const request = req.clone(obj);
		return next.handle(request).pipe(
			tap(
				(event: any) => {
					if (event instanceof HttpResponse) {
						const body = event.body;
						this.checkStatus(body);
					}
					return of(event);
				},
				error => {
					this.message.error('网络错误，请稍后重试');
					this.store.dispatch(ChangeIsSpinning({ isSpinning: false }));
					return of(error);
				}
			)
		);
	}
	private checkStatus(event: any) {
		this.store.dispatch(ChangeIsSpinning({ isSpinning: false }));
		if (
			(event.status >= 200 && event.status < 300) ||
			event.status === 401
		) {
			return;
		}
		const errortext = event.message || errObj[event.status];
		this.message.error(`请求错误 ${event.status}: ${errortext}`);
	}
	// 获取token
	private getToken() {
		let token = '';
		this.store.subscribe(state => {
			token = state.common.token;
		});
		return token;
	}
}
