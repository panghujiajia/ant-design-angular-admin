import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { LoginService } from 'src/app/services/login/login.service';
import { Store } from '@ngrx/store';
import { SaveToken, SaveUserInfo } from 'src/app/stores/actions/bus.action';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.less'],
})
export class LoginComponent implements OnInit {
	constructor(
		private fb: FormBuilder,
		private router: Router,
		private loginService: LoginService,
		private store: Store<{ common: any }>
	) {}
	isSpinning: boolean; // 页面loading
	ngOnInit(): void {
		this.store.subscribe(state => {
			this.isSpinning = state.common.isSpinning;
		});
	}
	// 登录
	submitForm(): void {
		const params = {
			username: 'admin',
			password: 'admin',
		};
		this.loginService.login(params).subscribe(res => {
			if (res) {
				this.store.dispatch(SaveToken({ token: res }));
				this.router.navigate(['']);
			}
		});
	}
}
