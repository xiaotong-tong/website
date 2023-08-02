import http from "../axios";

export async function verifyMasterUid(uid: string) {
	return await http.get(`/verify/${uid}`);
}
