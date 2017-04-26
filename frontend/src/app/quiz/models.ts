/*
 * Models for representing the a quiz.
 */
export class Quiz {
    id: number;
    title: string;
    description: string;
    finished: boolean;
    answered: boolean;
    questions: Question[];
}

export class Question {
    id: number;
    question: string;
    options: Option[];
}

export class Option {
    id: number;
    text: string;
    correct: boolean;
}


/*
* Models for creating new quizzes
*/
export class QuizCreateOption {
    text = "";
    correct = false;
}

export class QuizCreateQuestion {
    text: string = "";
    answer_description: string = "";
    options: QuizCreateOption[] = [];
}

export class QuizCreate {
    title: string = "";
    description: string = "";
    questions: QuizCreateQuestion[] = [new QuizCreateQuestion];
}


/*
* Models for answering the quiz for the student.
*/
export class QuizAnswer {
    quizID: number;
    answers: QuestionAnswer[];
}

export class QuestionAnswer {
    question:number;
    choice:number;
}



/*
*   Models for quiz results.
*/
export class OptionResults {
    optionID: number;
    text: string;
    correct: boolean;
    answers: number;
}

export class QuestionResults {
    questionID: number;
    question: string;
    optionResults: OptionResults[]; 
}

export class QuizResults {
    quizID: number;
    title: string;
    questionsResults: QuestionResults[];

}
