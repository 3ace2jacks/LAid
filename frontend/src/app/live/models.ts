export class ButtonCount {
	to_fast: number;
	to_slow: number;
}

export class Question {
	id: number;
	question: string;
	upvotes: number;
	downvotes: number;
	has_voted: boolean;
	answered: boolean;
}