import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AclRoleDirective } from '../directives/acl-role.directive';
// 放一些公用的模块，供其它模块使用
@NgModule({
	declarations: [AclRoleDirective],
	imports: [
		CommonModule,
		NgZorroAntdModule,
		FormsModule,
		ReactiveFormsModule,
	],
	exports: [
		CommonModule,
		NgZorroAntdModule,
		FormsModule,
		ReactiveFormsModule,
		AclRoleDirective,
	],
})
export class ShareModule {}
