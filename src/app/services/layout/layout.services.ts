import { Injectable } from "@angular/core";
import { ServicesModule } from "../services.module";
import { MENU_LIST } from "src/app/configs/menuConfig";
import { Observable } from "rxjs";

@Injectable({
	providedIn: ServicesModule,
})
export class LayoutService {
	constructor() {}

	/**
	 * 取菜单列表
	 */
	getMenuList() {
		return new Observable((observe) => {
			observe.next(MENU_LIST);
			observe.complete();
		});
	}
}
