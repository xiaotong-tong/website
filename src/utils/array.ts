import type { MaybeRef } from "vue";
import { unref } from "vue";

export function getOne<T>(list: MaybeRef<T[] | null>): T | null {
	const arr = unref(list);

	if (!arr) {
		return null;
	}

	const rIndex = Math.floor(Math.random() * arr.length);
	return arr[rIndex];
}
