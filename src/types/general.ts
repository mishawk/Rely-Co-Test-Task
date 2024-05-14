import { Character } from './character';

export interface ApiError {
	message: string;
}

export interface PageInfo {
	count: number;
	pages: number;
	next: string | null;
	prev: string | null;
}

export interface CharactersResponse {
	info: PageInfo;
	results: Character[];
}

export enum SortDirection {
	ASC = 'asc',
	DESC = 'desc',
	NONE = '',
}
export interface SortConfig {
	key: string | null;
	direction: SortDirection;
}
