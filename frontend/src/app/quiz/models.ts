export class Quiz {
    title:string;
    description:string;
    start_time:string;
    end_time:string;
    lectureID:number =null;
    lectureQuiz:string = null;
    questions:Question[];

    constructor() {
        this.title = "";
        this.description = "";
        this.start_time = "";
        this.end_time = "";
        this.lectureID = null;
        this.lectureQuiz = "";
        this.questions = [];
    }
}

export class Question {
    question:string;
    answer_description:string;
    options:Option[];
}

export class Option {
    text:string;
    correct:boolean;
}
