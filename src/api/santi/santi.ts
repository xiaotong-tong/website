import http from "../axios";
import type { AxiosResponse } from "axios";
import type { SantiInfo } from "@/types/santi";

export async function getSanti(): Promise<AxiosResponse<SantiInfo[]>> {
	return await http.get("/santi/list");
}

export async function addSanti(body: { content: string; topic: string }) {
	return await http.post("/santi/add", body);
}

export async function deleteLive(id: number) {
	return await http.delete(`/santi/delete/${id}`);
}
