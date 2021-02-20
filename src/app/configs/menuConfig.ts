/**
 * 菜单配置文件
 */
// 菜单列表
export const MENU_LIST = [
	{
		title: '菜单管理',
		meta: {
			icon: 'menu',
			role: ['menu'],
		},
		children: [
			{
				title: '菜单列表',
				path: '/menu',
				isLeaf: true,
				meta: {
					role: ['menu:list'],
				},
			},
			{
				title: '菜单列表1',
				path: '/menu1',
				isLeaf: false,
				meta: {
					role: ['menu:123'],
				},
			},
		],
	},
	{
		title: '用户管理',
		meta: {
			icon: 'user',
			role: ['user'],
		},
		children: [
			{
				title: '用户列表',
				path: '/user',
				isLeaf: true,
				meta: {
					role: ['user:list'],
				},
			},
		],
	},
];
