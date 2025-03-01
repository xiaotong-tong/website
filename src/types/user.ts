export interface UserInfo {
	id: number;
	name: string;
	avatar: string;
	password: string;
}

export interface RefreshUserInfo {
	code: number;
	msg: string;
}
