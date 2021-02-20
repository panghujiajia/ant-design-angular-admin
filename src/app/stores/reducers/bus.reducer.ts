import { createReducer, on, State, Action } from '@ngrx/store';
import { ChangeIsSpinning } from '../actions/bus.action';
import { initialData } from '../states/bus.state';
// tslint:disable-next-line: variable-name
const _commonReducer = createReducer(
	initialData,
	on(ChangeIsSpinning, (state, isSpinning) => ({ ...state, isSpinning }))
);

export function commonReducer(state: State<any>, action: Action) {
	return _commonReducer(state, action);
}
