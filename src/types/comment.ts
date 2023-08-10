import type { UUID } from "crypto";

export interface Comment {
	id: number;
	uid: UUID;
	articleId: number;
	nickname: string;
	content: string;
	email: string;
	createDate: string;
	parent: number;
	replyNickName: string;
	replyId: number;
	children: Comment[];
}
