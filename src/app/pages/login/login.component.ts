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
	validateForm: FormGroup;
	constructor(
		private fb: FormBuilder,
		private router: Router,
		private loginService: LoginService,
		private message: NzMessageService,
		private store: Store<{ common: any }>
	) {}
	condition = false;
	menuList: any = [];
	isSpinning: boolean; // 页面loading
	ngOnInit(): void {
		this.validateForm = this.fb.group({
			username: [null, [Validators.required]],
			password: [null, [Validators.required]],
			remember: [false],
		});
		this.store.subscribe(state => {
			this.isSpinning = state.common.isSpinning;
		});
	}
	// 登录
	submitForm(): void {
		// tslint:disable-next-line: forin
		for (const i in this.validateForm.controls) {
			this.validateForm.controls[i].markAsDirty();
			this.validateForm.controls[i].updateValueAndValidity();
		}
		if (this.validateForm.status !== 'VALID') {
			return;
		}
		const value = this.validateForm.value;
		const params = {
			username: value.username,
			password: value.password,
		};
		this.loginService.login(params).subscribe(res => {
			if (res) {
				this.store.dispatch(SaveToken({ token: res.data.token }));
				this.getInfo();
			}
		});
	}
	// 获取用户信息及权限
	getInfo() {
		this.loginService.info().subscribe(res => {
			if (res) {
				console.log(res);
				this.store.dispatch(SaveUserInfo({ info: res.data }));
				this.router.navigate(['']);
			}
		});
	}
}
