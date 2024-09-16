import http from "../axios";
import type { AxiosResponse } from "axios";
import type { LiveInfo } from "@/types/live";

export async function getLives(): Promise<AxiosResponse<LiveInfo[]>> {
	return await http.get("/lives/list");
}

export async function addLive(body: { content: string; userId: number }) {
	return await http.post("/lives/add", body);
}
