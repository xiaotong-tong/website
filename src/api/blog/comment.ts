import http from "../axios";
import type { Comment, recentCommentBody } from "@/types/comment";

interface AddCommentBody {
	articleId?: number;
	isGuestbook?: boolean;
	photoUrl?: string;
	nickname?: string;
	email?: string;
	content: string;
	replyId?: number;
	replyNickname?: string;
	parentId?: number;
}
export async function addComment(body: AddCommentBody) {
	if (!body.articleId && !body.isGuestbook) {
		throw new Error("articleId or isGuestbook is required");
	}
	return await http.post("/comment/add", body);
}

export async function getCommentList(options: {
	articleId?: number;
	isGuestbook?: boolean;
}): Promise<Comment[]> {
	const { articleId, isGuestbook } = options;

	if (!articleId && !isGuestbook) {
		throw new Error("articleId or isGuestbook is required");
	}

	const data = await http.get("/comment/list", {
		params: isGuestbook
			? {
					isGuestbook
			  }
			: {
					articleId
			  }
	});

	return data.data;
}

export async function delectComment(commentId: number) {
	return await http.delete("/comment/delete/" + commentId);
}

export async function uploadPhoto(url: string) {
	return await http.post("/comment/upload/photo", {
		url
	});
}

export async function getPhotoList() {
	const data = await http.get("/comment/photo/list");
	return data.data;
}

// 获取最新评论
export async function getRecentCommentList(limit?: number): Promise<recentCommentBody[]> {
	const data = await http.get("/comment/list/recent", {
		params: {
			limit
		}
	});
	return data.data;
}
