import { Injectable } from '@angular/core';
import {
	HttpInterceptor,
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpErrorResponse,
	HttpResponseBase,
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
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		const token = '';
		const userInfo = null;
		if (!token || userInfo === null) {
			this.router.navigate(['login']);
		}
		this.store.dispatch(ChangeIsSpinning({ isSpinning: true }));
		let obj = {};
		// 不需要token的接口需传needToken = false
		// 不传needToken则get到的值为null，表示需要token
		if (request.method === 'GET') {
			if (request.params.get('needToken') === null) {
				obj = {
					headers: request.headers.set('Authorization', token),
				};
			}
		} else {
			if (request.body || request.body.needToken === null) {
				obj = {
					headers: request.headers.set('Authorization', token),
				};
			}
		}
		const req = request.clone(obj);
		return next.handle(req).pipe(
			mergeMap((event: any) => {
				// 正常返回，处理具体返回参数
				if (event instanceof HttpResponseBase) {
					return this.handleData(event); // 具体处理请求返回数据
				}
				return of(event);
			}),
			catchError((err: HttpErrorResponse) => this.handleData(err))
		);
	}
	private checkStatus(event: HttpResponseBase) {
		if (
			(event.status >= 200 && event.status < 300) ||
			event.status === 401
		) {
			return;
		}
		const errortext = errObj[event.status] || event.statusText;
		this.message.error(`请求错误 ${event.status}: ${event.url}`, errortext);
	}
	private handleData(event: HttpResponseBase): Observable<any> {
		this.checkStatus(event);
		this.store.dispatch(ChangeIsSpinning({ isSpinning: false }));
		// 业务处理：一些通用操作
		switch (event.status) {
			case 200:
				break;
			case 401: // 未登录状态码
				this.message.error('未登录或登录已过期，请重新登录。');
				break;
			case 404:
				break;
			case 500:
				break;
			default:
				if (event instanceof HttpErrorResponse) {
					console.warn(
						'未可知错误，大部分是由于后端不支持CORS或无效配置引起',
						event
					);
					return throwError(event);
				}
				break;
		}
		return of(event);
	}
}
