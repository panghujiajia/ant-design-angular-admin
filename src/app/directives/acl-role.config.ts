export const role = {
	root: {
		addUser: true,
		deleteUser: true,
		changeUser: true,
		findUser: true,
	},
	admin: {
		addUser: true,
		deleteUser: false,
		changeUser: true,
		findUser: true,
	},
	user: {
		addUser: false,
		deleteUser: false,
		changeUser: true,
		findUser: true,
	},
	guest: {
		addUser: false,
		deleteUser: false,
		changeUser: false,
		findUser: true,
	},
};
