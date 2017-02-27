export class Quiz {
    title:string;
    description:string;
    start_time:string;
    end_time:string;
    questions:Question[];
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
