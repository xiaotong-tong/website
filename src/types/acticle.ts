import type { UUID } from "crypto";

export interface Acticle {
	id: number;
	uid: UUID;
	title: string;
	content: string;
	author: string;
	category: string;
	tags: string;
	createDate: string;
	thumbnail: string;
	abstract: string;
	jaTitle: string;
	jaContent: string;
	jaAuthor: string;
	jaAbstract: string;
	jaTags: string;
	jaCategory: string;
}

export interface ActicleById extends Acticle {
	next: {
		id: number;
		uid: UUID;
		title: string;
	};
	prev: {
		id: number;
		uid: UUID;
		title: string;
	};
}

export interface AddActicleBody {
	title: string;
	content: string;
	author: string;
	category: string;
	tags?: string;
	abstract?: string;
	thumbnail?: string;
	jaTitle: string;
	jaContent: string;
	jaAuthor: string;
	jaAbstract: string;
	jaTags: string;
	jaCategory: string;
}

export interface EditActicleBody {
	title?: string;
	content?: string;
	author?: string;
	category?: string;
	tags?: string;
	abstract?: string;
	thumbnail?: string;
	jaTitle: string;
	jaContent: string;
	jaAuthor: string;
	jaAbstract: string;
	jaTags: string;
	jaCategory: string;
}
