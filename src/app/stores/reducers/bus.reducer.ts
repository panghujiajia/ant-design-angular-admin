import { createReducer, on, State, Action } from '@ngrx/store';
import { ChangeIsSpinning, SaveMenuList, SaveToken, SaveUserInfo } from '../actions/bus.action';
import { initialData } from '../states/bus.state';
// tslint:disable-next-line: variable-name
const _commonReducer = createReducer(
	initialData,
	on(SaveToken, (state, token) => ({ ...state, ...token })),
	on(SaveUserInfo, (state, info) => ({ ...state, ...info })),
	on(ChangeIsSpinning, (state, isSpinning) => ({ ...state, ...isSpinning })),
	on(SaveMenuList, (state, menuList) => ({ ...state, ...menuList }))
);

export function commonReducer(state: State<any>, action: Action) {
	return _commonReducer(state, action);
}
