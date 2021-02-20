import {
	Directive,
	ElementRef,
	Renderer2,
	Input,
	SimpleChanges,
} from "@angular/core";
import { role } from "./acl-role.config";

/**
 * 权限控制 基于角色
 * appAclRole 角色值 string | string[]  例：'admin' | ['admin', 'user']
 * 添加了角色的元素需同步添加权限名，不添加则直接不可用
 * appAclName 权限名 string
 */
@Directive({
	selector: "[appAclRole]",
})
export class AclRoleDirective {
	constructor(private el: ElementRef, private renderer: Renderer2) {}

	// 角色名
	@Input() appAclRole: string | string[];
	// 权限名
	@Input() appAclName: string;

	ngOnInit() {
		this.authentication();
	}
	ngOnChanges(changes: SimpleChanges): void {
		this.appAclRole = changes.appAclRole.currentValue;
		this.appAclRole && this.authentication();
	}
	// 鉴权
	private authentication() {
		let el = this.el.nativeElement;
		// 拿到当前权限的名称
		let appAclName = this.appAclName;
		if (!appAclName) {
			this.renderer.removeChild(el, el);
			return;
		}
		// 拿到当前设定的角色
		let appAclRole = this.appAclRole;
		switch (typeof appAclRole) {
			case "string":
				this.singlePermiss(appAclName, appAclRole);
				break;
			case "object":
				this.multiplePermiss(appAclName, appAclRole);
				break;
			default:
				break;
		}
	}
	/**
	 * 单个角色的权限控制
	 * 直接进行权限判断
	 * @param appAclName 权限名
	 * @param appAclRole 角色名
	 */
	private singlePermiss(appAclName: string, appAclRole: string) {
		// 当前角色对应的权限
		let promiss = role[appAclRole];
		// 如果没权限就移除
		let el = this.el.nativeElement;
		if (!promiss[appAclName]) {
			// this.renderer.removeChild(el, el);
			this.renderer.setStyle(el, "display", "none");
		} else {
			this.renderer.setStyle(el, "display", "inline-block");
		}
	}
	/**
	 * 多个角色的权限控制
	 * 先将所有角色权限合并
	 * 再进行权限判断
	 * @param appAclName 权限名
	 * @param appAclRole 角色名
	 */
	private multiplePermiss(appAclName: string, appAclRole: string[]) {
		let i = 0,
			aclList = {},
			len = appAclRole.length;
		for (; i < len; i++) {
			// 某个角色
			let acl = appAclRole[i];
			// 某个角色的权限列表
			let list = role[acl];
			console.log("单个角色的权限", list);
			for (let item in list) {
				if (list.hasOwnProperty(item)) {
					// 如果新的权限列表不存在某个功能权限 则添加进去 默认false
					if (aclList[item] == undefined) {
						aclList[item] = false;
					}
					if (list[item]) {
						aclList[item] = true;
					}
				}
			}
		}
		console.log("合并后的权限列表", aclList);
		let el = this.el.nativeElement;
		if (!aclList[appAclName]) {
			// this.renderer.removeChild(el, el);
			this.renderer.setStyle(el, "display", "none");
		} else {
			this.renderer.setStyle(el, "display", "inline-block");
		}
	}
}
