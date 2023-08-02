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
}

export interface AddActicleBody {
	title: string;
	content: string;
	author: string;
	category: string;
	tags?: string;
	abstract?: string;
	thumbnail?: string;
}

export interface EditActicleBody {
	title?: string;
	content?: string;
	author?: string;
	category?: string;
	tags?: string;
	abstract?: string;
	thumbnail?: string;
}
