// 动态添加的菜单路由（以下菜单全部为受控菜单）
export const asyncRouterMap = [
	{
		title: '欢迎页',
		path: 'welcome',
		meta: {
			role: ['welcome'],
			invisible: true, // 表示不渲染菜单
		},
	},
	{
		title: '菜单管理',
		path: 'menu',
		meta: {
			icon: 'menu',
			role: ['menu'],
		},
		children: [
			{
				title: '列表',
				path: 'list',
				meta: {
					icon: 'menu',
					role: ['menu:list'],
				},
			},
			{
				title: '添加',
				path: 'add',
				meta: {
					role: ['menu:add'],
					invisible: true, // 表示不渲染菜单
				},
			},
			{
				title: '编辑',
				path: 'edit',
				meta: {
					role: ['menu:edit'],
					invisible: true, // 表示不渲染菜单
				},
			},
			{
				title: '删除',
				path: 'delete',
				meta: {
					role: ['menu:delete'],
					invisible: true, // 表示不渲染菜单
				},
			},
		],
	},
	{
		title: '用户管理',
		path: 'user',
		meta: {
			icon: 'user',
			role: ['user'],
		},
		children: [
			{
				title: '列表',
				path: 'list',
				meta: {
					role: ['user:list'],
				},
			},
			{
				title: '添加',
				path: 'add',
				meta: {
					role: ['user:add'],
					invisible: true, // 表示不渲染菜单
				},
			},
			{
				title: '编辑',
				path: 'edit',
				meta: {
					role: ['user:edit'],
					invisible: true, // 表示不渲染菜单
				},
			},
			{
				title: '删除',
				path: 'delete',
				meta: {
					role: ['user:delete'],
					invisible: true, // 表示不渲染菜单
				},
			},
		],
	},
];
