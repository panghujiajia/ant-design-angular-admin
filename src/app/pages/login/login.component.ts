import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { Store } from '@ngrx/store';
import { LayoutService } from 'src/app/services/layout/layout.services';
import cloneDeep from 'lodash/cloneDeep';

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
		private layoutService: LayoutService,
		private message: NzMessageService,
		private store: Store<{ common: any }>
	) {}
	condition = false;
	menuList: any = [];
	ngOnInit(): void {
		this.validateForm = this.fb.group({
			userNum: [null, [Validators.required]],
			password: [null, [Validators.required]],
			remember: [false],
		});
		this.getMenuList();
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
			userNum: value.userNum,
			password: value.password,
		};
		this.getMenuList();
		// this.router.navigate(['']);
	}
	hasPromission(route, roles) {
		if (route.meta && route.meta.role) {
			if (route.meta.role.includes('root')) {
				return true;
			}
			return roles.some(role => {
				return route.meta.role.includes(role);
			});
		} else {
			return false;
		}
	}
	// 获取用户权限菜单
	getAccessList() {
		const roles = ['menu', 'menu:list', 'user'];
		const routers = cloneDeep(this.menuList);
		console.log(routers);
		const newRouter = this.menuList.map(item => {
			console.log(item);
			if (this.hasPromission(item, roles)) {
				if (item.children && item.children.length) {
					item.children = this.hasPromission(item.children, roles);
				}
				// 如果给了模块权限，没给路由权限，则不返回
				if (item.children && !item.children.length) {
					return false;
				}
				return item;
			}
			return false;
		});
		return newRouter.filter((item: any) => {
			return item;
		});
	}
	// 获取完整菜单列表
	getMenuList() {
		this.layoutService.getMenuList().subscribe(res => {
			console.log(res);
			this.menuList = res;
			const list = this.getAccessList();
		});
	}
}
