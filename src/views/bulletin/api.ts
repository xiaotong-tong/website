import http from "@/api/axios";

export interface BulletinGroupResponse {
	code: number;
	data: BulletinGroup[];
}

export interface BulletinGroup {
	height: number;
	id: number;
	url: string;
	width: number;
}

// 获取留言组信息
export async function getGroupList(): Promise<BulletinGroupResponse> {
	const { data } = await http.get("/bulletinGroup/list");

	return data;
}

export interface GetBulletinListSearchParams {
	groupId: number;
}
export interface BulletinCard {
	content: string;
	width: number;
	height: number;
	x: number;
	y: number;
	type: number;
	theme: {
		bgColor: string;
		color: string;
		borderColor: string;
		borderSize: number;
	};
}

// 获取留言组内的留言列表
export async function getBulletinList(params: GetBulletinListSearchParams): Promise<BulletinCard[]> {
	const { data } = await http.get("bulletin/list", {
		params
	});

	return data;
}
