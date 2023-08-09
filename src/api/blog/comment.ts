import http from "../axios";

interface AddCommentBody {
	articleId: number;
	nickname?: string;
	email?: string;
	content: string;
	replyId?: number;
	replyNickname?: string;
	parentId?: number;
}
export async function addComment(body: AddCommentBody) {
	return await http.post("/comment/add", body);
}

export async function getCommentList(articleId: number) {
	const data = await http.get("/comment/list", {
		params: {
			articleId
		}
	});

	return data.data;
}

export async function delectComment(commentId: number) {
	return await http.delete("/comment/delete/" + commentId);
}
