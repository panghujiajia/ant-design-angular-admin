import { createAction, props } from '@ngrx/store';

export const SaveToken = createAction(
	'[Layout Component] SaveToken',
	props<{ token: string }>()
);
export const SaveUserInfo = createAction(
	'[Layout Component] SaveUserInfo',
	props<{ info: any }>()
);
// 全局loading
export const ChangeIsSpinning = createAction(
	'[Layout Component] ChangeIsSpinning',
	props<{ isSpinning: boolean }>()
);

// 保存菜单
export const SaveMenuList = createAction(
	'[Layout Component] SaveMenuList',
	props<{ menuList: any }>()
);
