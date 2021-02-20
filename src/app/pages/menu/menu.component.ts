import { Component, OnInit } from "@angular/core";
import { NzFormatEmitEvent } from "ng-zorro-antd";
import { LayoutService } from "src/app/services/layout/layout.services";

@Component({
	selector: "app-menu",
	templateUrl: "./menu.component.html",
	styleUrls: ["./menu.component.less"],
})
export class MenuComponent implements OnInit {
	constructor(private layoutService: LayoutService) {}
	nodes = [
		{
			title: "菜单管理",
			key: "1001",
			expanded: true,
			children: [
				{ title: "菜单列表", key: "10010", isLeaf: true },
				{ title: "菜单列表1", key: "10011", isLeaf: true },
				{ title: "菜单列表2", key: "10012", isLeaf: true },
			],
		},
		{
			title: "用户管理",
			key: "1002",
			children: [
				{ title: "用户列表", key: "10020", isLeaf: true },
				{ title: "用户列表1", key: "10021", isLeaf: true },
			],
		},
		{
			title: "券管理",
			key: "1003",
			children: [
				{ title: "券管理1", key: "10030", isLeaf: true },
				{ title: "券管理2", key: "10031", isLeaf: true },
			],
		},
	];
	ngOnInit() {}
	getMenuList() {
		this.layoutService.getMenuList().subscribe((res) => {
			// this.nodes = res;
		});
	}
	nzEvent(event: NzFormatEmitEvent): void {
		console.log(event);
	}
}
