export interface LiveInfo {
	id: number;
	content: string;
	userId: number;
	createTime: string;
	contentType: string;
	verify: {
		name: string;
		jpName: string;
		avatar: string;
	};
}
