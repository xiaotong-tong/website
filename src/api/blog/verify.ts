import { UUID } from "crypto";
import http from "../axios";

export async function verifyMasterUid(uid: UUID) {
	return await http.get(`/verify/${uid}`);
}
