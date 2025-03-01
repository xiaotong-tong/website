import http from "../axios";
import type { UserInfo, RefreshUserInfo } from "@/types/user";
import { useUserInfoStore } from "@/stores/user";

export async function verifyMasterUid(uid: string): Promise<{
	code: number;
	data: any;
	msg: string;
}> {
	if (!uid) {
		throw new Error("uid is required");
	}
	const res = await http.get(`/verify/${uid}`);

	return res.data;
}

export async function editUserInfo(params: UserInfo): Promise<UserInfo> {
	const res = await http.put("/verify/edit", params);

	return res.data;
}

export async function refreshUserInfo(): Promise<RefreshUserInfo> {
	const userInfoStore = useUserInfoStore();

	if (userInfoStore.userInfo?.id) {
		const res = await http.get("/verify/user/refresh");

		return res.data;
	}

	return {
		code: -1,
		msg: "用户未登录"
	};
}
