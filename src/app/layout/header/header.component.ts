import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Router } from '@angular/router';
import { en_US, NzI18nService } from 'ng-zorro-antd/i18n';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.less'],
})
export class HeaderComponent implements OnInit {
	@Input() isCollapsed: boolean;
	@Output() private outer = new EventEmitter<boolean>();

	constructor(private router: Router, private i18n: NzI18nService) {}
	userName = '张三'; // 用户名
	ngOnInit() {}

	changeUser() {
		this.userName = '李四';
	}
	// 退出登录
	loginOut() {
		this.router.navigate(['login']);
	}
	// 侧边栏收缩切换
	toggleCollapsed() {
		this.isCollapsed = !this.isCollapsed;
		this.outer.emit(this.isCollapsed);
	}
}
