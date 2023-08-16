export interface JPWord {
	id: number;
	word: string;
	kana: string;
	accent: number;
	english: string;
	mean: string;
	read: string;
}

export interface AddWordBody {
	word: string;
	kana: string;
	accent: number;
	english: string;
	mean: string;
	read: string;
}
