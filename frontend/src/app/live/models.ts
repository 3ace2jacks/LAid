// The model for the count of votes to display in the chart.
export class ButtonCount {
	to_fast: number;
	to_slow: number;
}

// A live lecture question.
export class Question {
	id: number;
	question: string;
	upvotes: number;
	downvotes: number;
	// Wheter the current user has voted or not
	has_voted: boolean;
	answered: boolean;
}