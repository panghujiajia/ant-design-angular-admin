import { Component, OnInit, Input } from "@angular/core";
import { MENU_LIST, MenuList } from "../../configs/menuConfig";
import Scrollbar from "smooth-scrollbar";

@Component({
	selector: "app-aside",
	templateUrl: "./aside.component.html",
	styleUrls: ["./aside.component.less"],
})
export class AsideComponent implements OnInit {
	@Input() isCollapsed: boolean;
	menuList: MenuList[] = MENU_LIST; // 菜单列表
	isOpen: boolean = true; // 子菜单展开状态
	constructor() {}

	ngOnInit() {
		Scrollbar.initAll();
	}
}
