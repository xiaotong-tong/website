import http from "../axios";
import type { UserInfo } from "@/types/user";

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
