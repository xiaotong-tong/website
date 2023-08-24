import http from "../axios";

export async function verifyMasterUid(uid: string): Promise<string> {
	const res = await http.get(`/verify/${uid}`);

	return res.data;
}
