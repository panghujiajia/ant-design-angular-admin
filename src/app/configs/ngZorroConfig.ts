/**
 * ng-zorro配置文件
 */
import { NzConfig, NZ_CONFIG, NZ_I18N, NZ_ICONS, zh_CN } from 'ng-zorro-antd';

import {
	MenuFoldOutline,
	MenuUnfoldOutline,
	FormOutline,
	DashboardOutline,
} from '@ant-design/icons-angular/icons';

const icons = [
	MenuFoldOutline,
	MenuUnfoldOutline,
	DashboardOutline,
	FormOutline,
];
// zorro全局配置
const zorroConfig: NzConfig = {
	// 注意组件名称没有 nz 前缀
	message: { nzTop: 120 },
	notification: { nzTop: 240 },
	// button: { nzSize: 'small' },
	table: {
		nzSize: 'small',
		nzBordered: true,
		nzShowSizeChanger: true,
		nzShowQuickJumper: true,
	},
};

export const ngZorroConfig = [
	{ provide: NZ_I18N, useValue: zh_CN },
	{ provide: NZ_ICONS, useValue: icons },
	{ provide: NZ_CONFIG, useValue: zorroConfig },
];
