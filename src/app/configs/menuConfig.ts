import { WelcomeComponent } from "../pages/welcome/welcome.component";

/**
 * 菜单配置文件
 */
export interface MenuList {
	title: string;
	icon: string;
	children: Children[];
}
interface Children {
	title: string;
	path: string;
	isLeaf: boolean;
}
// 菜单列表
export const MENU_LIST: MenuList[] = [
	{
		title: "菜单管理",
		icon: "menu",
		children: [
			{ title: "菜单列表", path: "/menu", isLeaf: true },
			{
				title: "菜单列表1",
				path: "/menu1",
				isLeaf: false,
			},
		],
	},
	{
		title: "用户管理",
		icon: "user",
		children: [{ title: "用户列表", path: "/user", isLeaf: true }],
	},
];

// 菜单路由模块
export const MENU_ROUTES = [
	{
		path: "welcome",
		component: WelcomeComponent,
	},
	{
		path: "menu",
		loadChildren: () =>
			import("../pages/menu/menu.module").then((m) => m.MenuModule),
	},
	{
		path: "user",
		loadChildren: () =>
			import("../pages/user/user.module").then((m) => m.UserModule),
	},
];
