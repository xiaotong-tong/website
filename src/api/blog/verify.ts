import http from "../axios";

export async function verifyMasterUid(uid: string): Promise<string> {
	if (!uid) {
		throw new Error("uid is required");
	}
	const res = await http.get(`/verify/${uid}`);

	return res.data;
}
