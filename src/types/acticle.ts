import type { UUID } from "crypto";

export interface Acticle {
	id: number;
	uid: UUID;
	title: string;
	content: string;
	category: string;
	tags: string;
	createDate: string;
	updateDate: string;
	thumbnail: string;
	abstract: string;
	jaTitle: string;
	jaContent: string;
	jaAbstract: string;
	jaTags: string;
	jaCategory: string;
	userId: number;
	verify: {
		name: string;
		jpName: string;
	};
}

export interface ActicleById extends Acticle {
	next: {
		id: number;
		uid: UUID;
		title: string;
		jaTitle: string;
	};
	prev: {
		id: number;
		uid: UUID;
		title: string;
		jaTitle: string;
	};
}

export interface AddActicleBody {
	title: string;
	content: string;
	category: string;
	tags?: string;
	abstract?: string;
	thumbnail?: string;
	jaTitle: string;
	jaContent: string;
	jaAbstract: string;
	jaTags: string;
	jaCategory: string;
}

export interface EditActicleBody {
	title?: string;
	content?: string;
	category?: string;
	tags?: string;
	abstract?: string;
	thumbnail?: string;
	jaTitle: string;
	jaContent: string;
	jaAbstract: string;
	jaTags: string;
	jaCategory: string;
	userId: number;
}
