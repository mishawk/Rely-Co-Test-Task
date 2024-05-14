export interface Character {
	id: number;
	name: string;
	status: Status;
	species: string;
	type: string;
	gender: Gender;
	origin: {
		name: string;
		url: string;
	};
	location: {
		name: string;
		url: string;
	};
	image: string;
	episode: string[];
	url: string;
	created: string;
}

export enum Gender {
	female = 'Female',
	male = 'Male',
	noGender = 'Genderless',
	unknown = 'unknown',
}

export enum Status {
	alive = 'Alive',
	dead = 'Dead',
	unknown = 'unknown',
}
