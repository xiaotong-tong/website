import type { UUID } from "crypto";

export interface Comment {
	id: number;
	uid: UUID;
	articleId: number;
	isGuestbook: boolean;
	photoUrl: string;
	nickname: string;
	content: string;
	email: string;
	createDate: string;
	parent: number;
	replyNickName: string;
	replyId: number;
	children: Comment[];
}

export interface recentCommentBody {
	id: number;
	uid: UUID;
	articleId: number;
	articleTitle?: string;
	isGuestbook: boolean;
	photoUrl: string;
	nickname: string;
	content: string;
	createDate: string;
}
