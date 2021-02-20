import { createAction, props } from '@ngrx/store';
// 全局loading
export const ChangeIsSpinning = createAction(
	'[Layout Component] ChangeIsSpinning',
	props<{ isSpinning: boolean }>()
);
