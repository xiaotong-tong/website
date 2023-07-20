import http from "../axios.js";

async function verifyMasterUid(uid) {
	return await http.get(`/verify/${uid}`);
}

export { verifyMasterUid };
